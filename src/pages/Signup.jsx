import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus } from 'lucide-react';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!username || !password || !mobile || !email) {
      return setError('Please fill in all fields.');
    }

    if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
      return setError('Mobile number must be exactly 10 digits.');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }

    setLoading(true);
    try {
      await signup(username, password, mobile, email);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to create an account.');
    }
    setLoading(false);
  };

  return (
    <div className="auth-modal">
      <div className="auth-tabs">
        <div className="auth-tab inactive" onClick={() => navigate('/login')}>Login</div>
        <div className="auth-tab active">Sign Up</div>
      </div>

      <div className="auth-content">
        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Verify your ID to join the NSS program</p>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="error-box"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Username (Student ID)</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. B24XXXX"
              value={username}
              onChange={(e) => setUsername(e.target.value.toUpperCase())}
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Email Address</label>
            <input
              type="email"
              className="input-field"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Create Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Mobile</label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter 10-digit Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Continue'}
            <UserPlus size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
