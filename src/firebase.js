import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAUb5WlH9HVnZztPP6DClLTXtbdyznieeI",
  authDomain: "nss-rguktb.firebaseapp.com",
  projectId: "nss-rguktb",
  storageBucket: "nss-rguktb.firebasestorage.app",
  messagingSenderId: "174332138615",
  appId: "1:174332138615:web:6bd5089ed1455479a4e272",
  measurementId: "G-2FSD17DRXQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
