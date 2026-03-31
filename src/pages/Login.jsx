import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password || !mobile) {
      return setError('Please enter your Username, Password and Mobile Number.');
    }

    setLoading(true);
    try {
      await login(username, password, mobile);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to log in. Please check your credentials.');
    }
    setLoading(false);
  };

  return (
    <div className="auth-modal">
      <div className="auth-tabs">
        <div className="auth-tab active">Login</div>
        <div className="auth-tab inactive" onClick={() => navigate('/signup')}>Sign Up</div>
      </div>

      <div className="auth-content">
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Enter your details to Access the dashboard</p>
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
            <label className="label">Username</label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Password</label>
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
              placeholder="Enter your Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
            <LogIn size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
