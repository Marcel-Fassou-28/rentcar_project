import { Lock, ArrowRight, LogIn } from 'lucide-react';
import Albinberlin from './../../assets/Vehicule/albinberlin.jpg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from '../config/Axios';
import { useState } from 'react';

function ResetPassword() {
  const [formData, setFormData] = useState({
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Extraire le token et l'email depuis l'URL
  const query = new URLSearchParams(location.search);
  const token = query.get('token');
  const email = query.get('email');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Vérifier que les mots de passe correspondent
    if (formData.password !== formData.password_confirmation) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    // Vérifier que le token et l'email sont présents
    if (!token || !email) {
      setError('Lien de réinitialisation invalide.');
      return;
    }

    try {
      const response = await axios.post('/reset', {
        email,
        token,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      });

      if (response.data.success) {
        setSuccess(response.data.message || 'Mot de passe réinitialisé avec succès !');
        setTimeout(() => navigate('/login', { state: { message: 'Mot de passe réinitialisé. Connectez-vous.' } }), 2000);
      } else {
        setError(response.data.message || 'Échec de la réinitialisation du mot de passe.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-orange-100 pt-16 md:pt-8 lg:pt-4">
      {/* Section Image */}
      <motion.div
        className="relative w-full md:w-1/2 h-[40vh] md:h-screen bg-cover bg-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ backgroundImage: `url(${Albinberlin})` }}
      >
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-6">
          <Lock className="size-20 mb-4 md:size-16" />
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Réinitialisez Votre Mot de Passe</h1>
          <p className="text-lg md:text-xl text-center mb-6">Saisissez un nouveau mot de passe pour sécuriser votre compte.</p>
          <Link to="/reservation" className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-full font-semibold transition">
            Réserver maintenant <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </motion.div>

      {/* Section Formulaire */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 mt-12">
        <motion.div
          className="w-full max-w-md bg-white rounded-lg shadow-lg p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Lock className="w-6 h-6" /> Réinitialisation du Mot de Passe
          </h2>
          {error && <p className="text-red-500 text-center font-semibold -mt-4 mb-2">{error}</p>}
          {success && <p className="text-green-500 text-center font-semibold -mt-4 mb-2">{success}</p>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Nouveau mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Votre nouveau mot de passe"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password_confirmation"
                  type="password"
                  name="password_confirmation"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Confirmez votre mot de passe"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  required
                  minLength={8}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link to="/forgot-password" className="text-sm text-orange-600 hover:underline">
                Demander un nouveau lien ?
              </Link>
              <button
                type="submit"
                className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition flex items-center gap-2"
              >
                Réinitialiser <LogIn className="w-4 h-4" />
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Retour à la connexion ?{' '}
            <Link to="/login" className="text-orange-600 hover:underline">
              Connectez-vous
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default ResetPassword;