import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';

// Protected Route Component
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { currentUser, userRole } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (requireAdmin && userRole !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

function AppRoutes() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={currentUser ? "/dashboard" : "/login"} replace />} />
      <Route path="/login" element={currentUser ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/signup" element={currentUser ? <Navigate to="/dashboard" replace /> : <Signup />} />
      
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requireAdmin={true}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
