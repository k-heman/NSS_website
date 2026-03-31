import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { Search, ShieldAlert, LogOut, LayoutDashboard, UserCheck, ShieldCheck } from 'lucide-react';

export default function AdminDashboard() {
  const { currentUser, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const [searchUsername, setSearchUsername] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (e) {
      console.error('Failed to logout', e);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSearchResults([]);

    if (!searchUsername.trim()) {
      return setError('Please enter a username to search.');
    }

    setSearchLoading(true);
    try {
      const q = query(
        collection(db, 'users'),
        where('username', '>=', searchUsername.toUpperCase()),
        where('username', '<=', searchUsername.toUpperCase() + '\uf8ff')
      );

      const querySnapshot = await getDocs(q);
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });

      if (results.length === 0) {
        setError('No users found matching that username.');
      } else {
        setSearchResults(results);
      }
    } catch (err) {
      console.error('Search error', err);
      setError('Failed to search users. Please try again.');
    }
    setSearchLoading(false);
  };

  const grantAdminRole = async (userId) => {
    setError('');
    setSuccess('');
    try {
      await updateDoc(doc(db, 'users', userId), {
        role: 'admin'
      });
      setSuccess(`Successfully granted admin privileges to ${userId}.`);

      // Update local state to reflect UI change instantly
      setSearchResults(prev => prev.map(u =>
        u.id === userId ? { ...u, role: 'admin' } : u
      ));
    } catch (err) {
      console.error('Error granting role', err);
      setError(`Failed to grant admin privileges to ${userId}.`);
    }
  };

  return (
    <div className="dashboard-container">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="nav-header"
      >
        <div className="nav-title">
          <ShieldAlert color="var(--danger)" />
          <span>Admin Workspace</span>
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <LayoutDashboard size={16} />
            User Dashboard
          </button>
          <button onClick={handleLogout} className="btn-danger" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-panel"
        style={{ padding: '40px', marginBottom: '32px' }}
      >
        <h2>Role Management</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          Search for users by their username (ID) to grant them administrator privileges.
        </p>

        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', top: '14px', left: '16px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="input-field"
              placeholder="Search by Username (e.g., B240011)..."
              style={{ paddingLeft: '44px' }}
              value={searchUsername}
              onChange={(e) => setSearchUsername(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: 'auto' }} disabled={searchLoading}>
            {searchLoading ? 'Searching...' : 'Search Users'}
          </button>
        </form>

        {error && <div className="error-msg" style={{ marginTop: '24px' }}>{error}</div>}

        {success && (
          <div style={{
            color: 'var(--accent)', marginTop: '24px', background: 'rgba(100, 255, 218, 0.1)',
            padding: '12px', borderRadius: '8px', border: '1px solid var(--accent)'
          }}>
            {success}
          </div>
        )}
      </motion.div>

      {searchResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '12px' }}>
            Search Results ({searchResults.length})
          </h3>
          <div className="user-list">
            {searchResults.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="user-card"
              >
                <div className="user-info">
                  <h4>{user.name || user.username} {user.username && <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>({user.username})</span>}</h4>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
                    <p>Role: <span style={{ textTransform: 'capitalize', color: 'var(--white)' }}>{user.role || 'User'}</span></p>
                    {user.batch && <p>Batch: <span style={{ color: 'var(--white)' }}>{user.batch}</span></p>}
                  </div>
                </div>

                <div>
                  {user.role === 'admin' ? (
                    <div className="badge-admin" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ShieldCheck size={16} /> Admin
                    </div>
                  ) : (
                    <button
                      className="btn-secondary"
                      onClick={() => grantAdminRole(user.id)}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      <UserCheck size={16} /> Grant Admin
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
