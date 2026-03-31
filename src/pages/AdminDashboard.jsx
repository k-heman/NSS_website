import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
// Added RefreshCw for the update button icon
import { Search, ShieldAlert, LogOut, LayoutDashboard, RefreshCw } from 'lucide-react';

export default function AdminDashboard() {
  const { currentUser, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const [searchUsername, setSearchUsername] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // New state to track the dropdown selections before saving
  const [selectedRoles, setSelectedRoles] = useState({});

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
    setSelectedRoles({}); // Reset dropdowns on new search

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

  // Helper to handle dropdown changes locally
  const handleRoleSelection = (userId, role) => {
    setSelectedRoles(prev => ({ ...prev, [userId]: role }));
  };

  // Updated to accept any role ('admin' or 'user')
  const updateUserRole = async (userId, newRole) => {
    setError('');
    setSuccess('');
    try {
      await updateDoc(doc(db, 'users', userId), {
        role: newRole
      });
      setSuccess(`Successfully updated role for user to ${newRole.toUpperCase()}.`);

      // Update local state to reflect UI change instantly
      setSearchResults(prev => prev.map(u =>
        u.id === userId ? { ...u, role: newRole } : u
      ));

      // Clear the pending selection for this specific user
      setSelectedRoles(prev => {
        const updated = { ...prev };
        delete updated[userId];
        return updated;
      });
    } catch (err) {
      console.error('Error updating role', err);
      setError(`Failed to update role for user.`);
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
          Search for users by their username (ID) to manage their access privileges.
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
            {searchResults.map((user) => {
              const currentRole = user.role || 'user';
              const pendingRole = selectedRoles[user.id] || currentRole;
              const hasRoleChanged = pendingRole !== currentRole;

              return (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="user-card"
                >
                  <div className="user-info">
                    <h4>{user.name || user.username} {user.username && <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>({user.username})</span>}</h4>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
                      <p>Current Role: <span style={{ textTransform: 'capitalize', color: currentRole === 'admin' ? 'var(--accent)' : 'var(--white)' }}>{currentRole}</span></p>
                      {user.batch && <p>Batch: <span style={{ color: 'var(--white)' }}>{user.batch}</span></p>}
                    </div>
                  </div>

                  {/* Dropdown & Update Button Section */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <select
                      value={pendingRole}
                      onChange={(e) => handleRoleSelection(user.id, e.target.value)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '6px',
                        background: 'rgba(255,255,255,0.05)',
                        color: '#fff',
                        border: '1px solid rgba(255,255,255,0.2)',
                        outline: 'none',
                        cursor: 'pointer',
                        minWidth: '100px'
                      }}
                    >
                      <option value="user" style={{ color: 'black' }}>User</option>
                      <option value="admin" style={{ color: 'black' }}>Admin</option>
                    </select>

                    <button
                      className="btn-secondary"
                      onClick={() => updateUserRole(user.id, pendingRole)}
                      disabled={!hasRoleChanged}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        opacity: hasRoleChanged ? 1 : 0.5,
                        cursor: hasRoleChanged ? 'pointer' : 'not-allowed'
                      }}
                    >
                      <RefreshCw size={16} /> Update Role
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}