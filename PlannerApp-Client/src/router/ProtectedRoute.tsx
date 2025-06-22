import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  exp: number;
  // ... other claims if needed
}

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken: DecodedToken = jwtDecode(token);
    
    // Check if token is expired
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return <Navigate to="/login" />;
    }

    const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    if (userRole === 'Admin') {
      // User is Admin, allow access
      return <Outlet />;
    } else {
      // Logged in but not an Admin, redirect to home page
      return <Navigate to="/" />;
    }
  } catch (error) {
    // Error decoding token (invalid token), clear storage and redirect to login
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute; 