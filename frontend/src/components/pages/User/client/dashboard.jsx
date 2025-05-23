import { useState, useEffect } from 'react';
import SidebarClient from './SidebarClient';
import { User, Car, Calendar, Bell, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from './../../../config/Axios';
import { Link } from 'react-router-dom';

const DashboardClient = () => {
  const [userName, setUserName] = useState('');
  const [stats, setStats] = useState({
    reservationsActives: 2,
    reservationsPassees: 7,
    pointsFidelite: 450,
    notificationsNonLues: 3
  });

  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  let parsedUser;
  try {
    parsedUser = JSON.parse(user);
  } catch (error) {
    console.error('Erreur lors du parsing de l\'utilisateur :', error);
    return;
  }

  const reservationsActives = [
    { id: 1, vehicule: 'Renault Clio', debut: '15/06/2025', fin: '20/06/2025', status: 'confirmée' },
    { id: 2, vehicule: 'Peugeot 3008', debut: '01/07/2025', fin: '08/07/2025', status: 'en attente' },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/user/dashboard/${parsedUser.id}`);
        if (response.data.success) {
          console.log(response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du nom utilisateur :', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="pt-16 flex flex-col md:flex-row bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
      <SidebarClient />
      <main className="flex-1 p-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          {/* En-tête */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 mb-6 text-white">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">Bienvenue, {userName}</h1>
                <p className="text-orange-100">Votre espace personnel RentCar</p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center">
                <div className="bg-white text-orange-600 p-2 rounded-full">
                  <User size={24} />
                </div>
                <button className="ml-4 bg-white/20 hover:bg-white/30 transition duration-300 text-white px-4 py-2 rounded-lg">
                  <Link to={`/${parsedUser.role}/my/profil/${parsedUser.id}`}>Éditer le profil</Link>
                </button>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl shadow p-5 flex items-center">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <Car className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Réservations actives</p>
                <p className="text-2xl font-bold text-gray-800">{stats.reservationsActives}</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow p-5 flex items-center">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <Calendar className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Réservations passées</p>
                <p className="text-2xl font-bold text-gray-800">{stats.reservationsPassees}</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl shadow p-5 flex items-center">
              <div className="rounded-full bg-purple-100 p-3 mr-4">
                <Settings className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Points fidélité</p>
                <p className="text-2xl font-bold text-gray-800">{stats.pointsFidelite}</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl shadow p-5 flex items-center">
              <div className="rounded-full bg-red-100 p-3 mr-4">
                <Bell className="text-red-600" size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Notifications</p>
                <p className="text-2xl font-bold text-gray-800">{stats.notificationsNonLues}</p>
              </div>
            </motion.div>
          </div>

          {/* Réservations en cours */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
              <Calendar className="mr-2 text-orange-500" size={20} />
              Vos réservations en cours
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Véhicule</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date début</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date fin</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reservationsActives.map((reservation) => (
                    <tr key={reservation.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{reservation.vehicule}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{reservation.debut}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{reservation.fin}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${reservation.status === 'confirmée' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {reservation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-800 mr-3">Détails</button>
                        <button className="text-red-600 hover:text-red-800">Annuler</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Offres spéciales */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Offres spéciales pour vous</h2>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg">
              <p className="font-bold text-lg">10% de réduction sur votre prochaine location</p>
              <p className="mt-1">Utilisez le code promo: <span className="font-mono bg-white/20 px-2 py-1 rounded">FIDELITE10</span></p>
              <button className="mt-3 bg-white text-blue-600 px-4 py-2 rounded font-medium hover:bg-gray-100 transition duration-300">
                En profiter maintenant
              </button>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardClient;
