import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../config/Axios'; // Your axios configuration

const Deconnexion = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        // Get token before clearing localStorage
        const token = localStorage.getItem('token');
        if (token) {
          await axios.post('/logout', {}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        // Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Redirect to login
        navigate('/login', { replace: true });
      } catch (error) {
        console.error('Logout error:', error);
        // Clear localStorage and redirect even if API call fails
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login', { replace: true });
      }
    };

    logout();
  }, [navigate]);

  return null;
};

export default Deconnexion;
