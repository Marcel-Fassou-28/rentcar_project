import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from '../config/Axios';
import { debounce } from 'lodash';
import React from 'react';

const Car = lazy(() => import('lucide-react').then((module) => ({ default: module.Car })));
const Mail = lazy(() => import('lucide-react').then((module) => ({ default: module.Mail })));
const Lock = lazy(() => import('lucide-react').then((module) => ({ default: module.Lock })));
const LogIn = lazy(() => import('lucide-react').then((module) => ({ default: module.LogIn })));
const ArrowRight = lazy(() => import('lucide-react').then((module) => ({ default: module.ArrowRight })));
import { FcGoogle } from 'react-icons/fc';
import Albinberlin from './../../assets/Vehicule/albinberlin.jpg';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Memoize user data and authentication check
  const { token, id, name } = useMemo(() => {
    try {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if (!token || !user) return { token: null, id: null, name: '' };

      const parsedUser = JSON.parse(user);
      const id = parsedUser?.id;
      const name = parsedUser?.nom && parsedUser?.prenom ? encodeURIComponent(`${parsedUser.nom}-${parsedUser.prenom}`) : '';
      return { token, id, name };
    } catch (error) {
      console.error('Failed to parse user data:', error);
      return { token: null, id: null, name: '' };
    }
  }, []);

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (token && id && name) {
      navigate(`/dashboard/${id}/${name}`, { replace: true });
    }
  }, [token, id, name, navigate]);

  // Debounced handleChange to reduce state updates
  const handleChange = useMemo(
    () =>
      debounce((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      }, 200),
    []
  );

  // Clean up debounce on unmount
  useEffect(() => () => handleChange.cancel(), [handleChange]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/login', formData);
      if (!data.success) {
        setError(data.message || 'Invalid credentials');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate(`/dashboard/${data.id}/${encodeURIComponent(`${data.nom}-${data.prenom}`)}`, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-orange-100 pt-16 md:pt-8 lg:pt-4">
      {/* Section Image */}
      <motion.div
        className="relative w-full md:w-1/2 h-[40vh] md:h-screen bg-cover bg-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{ backgroundImage: `url(${Albinberlin})` }}
      >
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-6">
          <Suspense fallback={<div className="size-20" />}>
            <Car className="size-20 mb-4 md:size-16" />
          </Suspense>
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Louez Votre Voiture de Rêve</h1>
          <p className="text-lg md:text-xl text-center mb-6">Réservez dès maintenant et prenez la route en toute liberté !</p>
          <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-full font-semibold transition">
            Réserver maintenant
            <Suspense fallback={<div className="w-5 h-5" />}>
              <ArrowRight className="w-5 h-5" />
            </Suspense>
          </button>
        </div>
      </motion.div>

      {/* Section Formulaire */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 mt-12">
        <motion.div
          className="w-full max-w-md bg-white rounded-lg shadow-lg p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Suspense fallback={<div className="w-6 h-6" />}>
              <LogIn className="w-6 h-6" />
            </Suspense>
            Connexion
          </h2>
          {error && <p className="text-red-500 text-center font-semibold -mt-4 mb-2">{error}</p>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Adresse Email
              </label>
              <div className="relative">
                <Suspense fallback={<div className="w-5 h-5" />}>
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </Suspense>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="votre adresse email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <Suspense fallback={<div className="w-5 h-5" />}>
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </Suspense>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Votre mot de passe"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link to="/forgot-password" className="text-sm text-orange-600 hover:underline">
                Mot de passe oublié ?
              </Link>
              <button
                type="submit"
                className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition flex items-center gap-2"
              >
                Se connecter
                <Suspense fallback={<div className="w-4 h-4" />}>
                  <LogIn className="w-4 h-4" />
                </Suspense>
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
              </div>
            </div>

            <button className="mt-4 w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-50 transition">
              <FcGoogle className="w-5 h-5" /> Se connecter avec Google
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Pas de compte ?{' '}
            <Link to="/register" className="text-orange-600 hover:underline">
              Inscrivez-vous
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default React.memo(Login);