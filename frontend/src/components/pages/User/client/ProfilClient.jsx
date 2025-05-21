import { useEffect, useState } from 'react';
import SidebarClient from './SidebarClient';
import axios from '../../../config/Axios';
import { useAuth } from "../../../../components/AuthContext";
import { User, Mail, Phone, Home, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfilClient = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ nom: '', email: '', telephone: '', adresse: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`/user/profil/${user.id}`)
      .then(res => {
        setFormData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setMessage("Erreur lors du chargement des données");
        setMessageType('error');
        setLoading(false);
      });
  }, [user.id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setUpdating(true);
    try {
      await axios.patch(`/user/profil/update/${user.id}`, formData);
      setMessage('Profil mis à jour avec succès !');
      setMessageType('success');
      setTimeout(() => setMessage(''), 5000);
    } catch (err) {
      setMessage("Une erreur est survenue lors de la mise à jour du profil.");
      setMessageType('error');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-16 flex flex-col md:flex-row bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
        <SidebarClient />
        <main className="flex-1 p-6 md:p-8 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </main>
      </div>
    );
  }

  return (
    <div className="pt-16 flex flex-col md:flex-row bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <SidebarClient />
      <main className="flex-1 p-6 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <User className="text-orange-500" />
            Mon Profil
          </h2>
          <p className="text-gray-600 mt-1">Gérez vos informations personnelles</p>
        </motion.div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-4 p-4 rounded-md flex items-center gap-2 ${
              messageType === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}
          >
            {messageType === 'success' ? (
              <CheckCircle size={18} className="text-green-500" />
            ) : (
              <AlertCircle size={18} className="text-red-500" />
            )}
            <p>{message}</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-orange-500 mx-auto mb-4">
              <User size={40} />
            </div>
            <h3 className="text-center text-white text-xl font-bold">{formData.nom || 'Utilisateur'}</h3>
            <p className="text-center text-orange-100">{formData.email || 'email@exemple.com'}</p>
          </div>

          <form className="p-6 flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Nom complet</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  name="nom" 
                  value={formData.nom} 
                  onChange={handleChange} 
                  type="text" 
                  placeholder="Votre nom complet" 
                  className="border border-gray-300 p-3 pl-10 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  type="email" 
                  placeholder="Votre adresse email" 
                  className="border border-gray-300 p-3 pl-10 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Téléphone</label>
              <div className="relative">
                <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  name="telephone" 
                  value={formData.telephone} 
                  onChange={handleChange} 
                  type="text" 
                  placeholder="Votre numéro de téléphone" 
                  className="border border-gray-300 p-3 pl-10 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Adresse</label>
              <div className="relative">
                <Home size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  name="adresse" 
                  value={formData.adresse} 
                  onChange={handleChange} 
                  type="text" 
                  placeholder="Votre adresse complète" 
                  className="border border-gray-300 p-3 pl-10 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={updating}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-md font-medium flex items-center justify-center gap-2 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 disabled:opacity-70"
            >
              {updating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  Mise à jour...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Mettre à jour mon profil
                </>
              )}
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default ProfilClient;