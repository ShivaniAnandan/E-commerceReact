import React from 'react';
import { Navigate } from 'react-router-dom';

// PublicRoute component to restrict access to public routes for authenticated users
const PublicRoute = ({ isAuthenticated, children }) => {
  // If user is authenticated, redirect to home
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the public content (login/signup)
  return children;
};

export default PublicRoute;
