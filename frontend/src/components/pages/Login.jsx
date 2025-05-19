import { Car, Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import Albinberlin from './../../assets/Vehicule/albinberlin.jpg';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from '../config/Axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;          // ← on lit l’attribut name
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await axios.post('/login', formData);
      console.log(data);
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user',  JSON.stringify(data.user));

        navigate('/models');
      } else {
        setError(data.message || 'Identifiants invalides');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la connexion');
    }
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-orange-100 pt-16 md:pt-8 lg:pt-4">
      {/* Section Image */}
      <motion.div className="relative w-full md:w-1/2 h-[40vh] md:h-screen bg-cover bg-center" 
        initial={{ opacity: 0, y: 30}}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2}}

        style={{ backgroundImage: `url(${Albinberlin})` }}>
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-6">
          <Car className="size-20 mb-4 md:size-16" />
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Louez Votre Voiture de Rêve</h1>
          <p className="text-lg md:text-xl text-center mb-6">Réservez dès maintenant et prenez la route en toute liberté !</p>
          <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-full font-semibold transition">
            Réserver maintenant <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Section Formulaire */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 mt-12">
        <motion.div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8"
        initial={{ opacity: 0, y: 30}}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2}}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <LogIn className="w-6 h-6" /> Connexion
          </h2>
          {error && <p className="text-red-500 text-center font-semibold -mt-4 mb-2">{error}</p>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Adresse Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Votre mot de passe"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <a href="#" className="text-sm text-orange-600 hover:underline">
                Mot de passe oublié ?
              </a>
              <button
                type="submit"
                className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition flex items-center gap-2"
              >
                Se connecter <LogIn className="w-4 h-4" />
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

            <button
              className="mt-4 w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-50 transition"
            >
              <FcGoogle className="w-5 h-5" /> Se connecter avec Google
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Pas de compte ?{' '}
            <Link to='/register' className="text-orange-600 hover:underline">
              Inscrivez-vous
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;