import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const DOMAIN = '@nssrguktb.com';

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'user' | 'admin'
  const [loading, setLoading] = useState(true);

  // Helper to fetch user role
  const fetchUserRole = async (username) => {
    try {
      if (username === 'nssrguktb' || username === 'B231473') {
        return 'admin';
      }
      const docRef = doc(db, 'users', username);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().role || 'user';
      }
      return 'user';
    } catch (e) {
      console.error("Error fetching user role", e);
      return 'user';
    }
  };

  async function signup(username, password, mobile, emailAddress) {
    // 1. Verify username exists in our pre-populated database
    const docRef = doc(db, 'users', username);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error("Invalid username. You must use your assigned NSS ID to sign up.");
    }

    // 2. Create user in Firebase Auth
    const authEmail = username + DOMAIN;
    const userCredential = await createUserWithEmailAndPassword(auth, authEmail, password);
    
    // 3. Update Firestore with permanent email and mobile
    await setDoc(docRef, {
      mobile: mobile,
      email: emailAddress,
      role: 'user', // Ensure basic role
      uid: userCredential.user.uid,
      isRegistered: true
    }, { merge: true });
    
    return userCredential;
  }

  async function login(username, password, mobile) {
    // Special Admin handle
    if (username === 'nssrguktb' && password === 'admin@nssrguktb') {
      const email = username + DOMAIN;
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUserRole('admin');
        return userCredential;
      } catch (error) {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
          // Auto create initial admin if not found
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          await setDoc(doc(db, 'users', username), {
            username,
            role: 'admin',
            uid: userCredential.user.uid
          }, { merge: true });
          setUserRole('admin');
          return userCredential;
        }
        throw error;
      }
    }

    // Normal User Login
    const email = username + DOMAIN;
    try {
      // 1. Firebase Auth SignIn
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // 2. Fetch User Record to verify matching mobile
      const docRef = doc(db, 'users', username);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        await signOut(auth);
        throw new Error("User record not found in system.");
      }

      const userData = docSnap.data();
      
      // 3. Check mobile match
      if (userData.mobile !== mobile) {
        await signOut(auth);
        throw new Error("Mobile number does not match our records.");
      }

      const role = await fetchUserRole(username);
      setUserRole(role);
      return userCredential;
    } catch (error) {
       throw error;
    }
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const username = user.email.replace(DOMAIN, '');
        const role = await fetchUserRole(username);
        setUserRole(role);
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
