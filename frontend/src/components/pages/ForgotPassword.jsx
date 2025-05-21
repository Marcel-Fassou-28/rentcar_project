import { Mail, ArrowRight, LogIn } from 'lucide-react';
import Albinberlin from './../../assets/Vehicule/albinberlin.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from '../config/Axios';
import { useState } from 'react';

function ForgotPassword() {
  const [formData, setFormData] = useState({ email: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/email', { email: formData.email });
      if (response.data.success) {
        setSuccess(response.data.message || 'Un lien de réinitialisation a été envoyé à votre adresse e-mail.');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setError(response.data.message || 'Échec de l\'envoi du lien de réinitialisation.');
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
          <Mail className="size-20 mb-4 md:size-16" />
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Mot de Passe Oublié</h1>
          <p className="text-lg md:text-xl text-center mb-6">Recevez un lien pour réinitialiser votre mot de passe.</p>
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
            <Mail className="w-6 h-6" /> Réinitialisation du Mot de Passe
          </h2>
          {error && <p className="text-red-500 text-center font-semibold -mt-4 mb-2">{error}</p>}
          {success && <p className="text-green-500 text-center font-semibold -mt-4 mb-2">{success}</p>}
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
                  placeholder="Votre adresse email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link to="/login" className="text-sm text-orange-600 hover:underline">
                Retour à la connexion
              </Link>
              <button
                type="submit"
                className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition flex items-center gap-2"
              >
                Envoyer le lien <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

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
}

export default ForgotPassword;