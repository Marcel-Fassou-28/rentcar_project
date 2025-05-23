import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from '../config/Axios';
import { useAuth, slugify } from './../AuthContext';// Adjust path to your auth.js
import { useNavigate } from 'react-router-dom';

const GoogleAuth = ({ setError}) => {
    
  const navigate = useNavigate();
  const { login } = useAuth();
  const clientId = '370717300600-qh2e6uus805fm22omckb82ut5occcv96.apps.googleusercontent.com'; // Replace with your Client ID

  const handleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post('/auth/google/callback', {
        credential: credentialResponse.credential,
        client_id: clientId,
      });

      const { user, token } = response.data; // Expect user data and JWT from backend
      login(token, user);
      const fullSlug = encodeURIComponent(`${slugify(user.nom)}-${slugify(user.prenom)}`);
      navigate(`/${user.role}/dashboard/${user.id}/${fullSlug}`, { replace: true });

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Erreur lors de la connexion Google';
      setError(errorMessage);
      setTimeout(() => setError({ text: '', type: '' }), 5000);
      console.error('Google auth error:', error);
    }
  };

  const handleError = () => {
    setMessage('Échec de la connexion Google');
    setTimeout(() => setError(''), 500);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap // Optional: Enables One Tap login
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;