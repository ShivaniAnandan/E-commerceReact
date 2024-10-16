import React from 'react';
import { Navigate } from 'react-router-dom';

// ProtectedRoute component to guard access to authenticated routes
const ProtectedRoute = ({ isAuthenticated, children }) => {
  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the children (protected content)
  return children;
};

export default ProtectedRoute;
