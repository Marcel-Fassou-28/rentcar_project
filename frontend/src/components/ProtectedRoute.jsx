import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  // Check if token and user exist and are valid
  let isAuthenticated = false;
  try {
    isAuthenticated = token && user && JSON.parse(user)?.id;
  } catch (error) {
    console.error('Failed to parse user data:', error);
  }
  return isAuthenticated ? children : <Navigate to="/login" replace state={{ error: 'Please log in to access this page' }} />;
};

export default ProtectedRoute

