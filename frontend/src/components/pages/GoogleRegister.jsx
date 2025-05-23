import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from '../config/Axios';
import { useAuth, slugify } from './../AuthContext';// Ajustez le chemin
import { useNavigate } from 'react-router-dom';


const GoogleRegister = ({ setError }) => {
    const navigate = useNavigate();
  const { login } = useAuth();
  const clientId = "370717300600-qh2e6uus805fm22omckb82ut5occcv96.apps.googleusercontent.com"; // Remplacez par votre Client ID

  const handleSuccess = async (credentialResponse) => {
    try {
      // Envoyer le jeton Google au backend pour l'inscription
      const response = await axios.post('/auth/google/callback', {
        credential: credentialResponse.credential,
        client_id: clientId,
      });

      const { user, token } = response.data;
      navigate('/login');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Erreur lors de l\'inscription Google';
      setError(errorMessage);
      console.error('Google register error:', error);
    }
  };

  const handleError = () => {
    setError({ text: 'Échec de l\'inscription Google', type: 'error' });
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        text="signup_with" // Bouton "S'inscrire avec Google"
        useOneTap // Optionnel : active One Tap
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleRegister;