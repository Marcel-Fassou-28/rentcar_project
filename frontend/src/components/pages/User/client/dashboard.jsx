import { useState, useEffect } from 'react';
import SidebarClient from './SidebarClient';
import { User, Car, Calendar, Bell, Settings, CarFront } from 'lucide-react';
import { motion } from 'framer-motion';
import instance from './../../../config/Axios';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { useAuth } from '../../../AuthContext';
import Sidebar from '../admin/composants/Sidebar';

const DashboardClient = () => {
  const [reservations, setReservations] = useState([]);
  const [totalReservation, setTotalReservation] = useState(0)
  const [nbrVoitureReserve, setNbrVoitureReserve] = useState(0)
  const [stats, setStats] = useState({
    reservationsActives: 0,
    reservationsPassees: 0,
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await instance.get(`/user/dashboard/${parsedUser.id}`);
        console.log(response.data)
        if (response.data.success) {
          setTotalReservation(response.data.reservations.total);
          setNbrVoitureReserve(response.data.totalVoiture)
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du nom utilisateur :', error);
      }
    };

    const fetchReservations = async () => {
      try {
        const res = await instance.get('/user/reservations/my');
        setReservations(res.data);
        const actives = res.data.filter(r => r.statut !== 'annulée' && r.statut !== 'expiré');
        const past = res.data.filter(r => r.statut === 'expiré');
        setStats(prev => ({
          ...prev,
          reservationsActives: actives.length,
          reservationsPassees: past.length
        }));
      } catch (err) {
        console.error("Erreur lors du chargement des réservations :", err);
      }
    };
    fetchUserData();
    fetchReservations();
  }, []);

  return (
    <div className="pt-16 bg-gradient-to-b from-gray-50 to-gray-100 flex">
      <SidebarClient />
      <main className="flex-1 p-6 w-[89%]">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-7xl mx-auto">

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 mb-6 text-white w-full">
            <div className="flex flex-col md:flex-row justify-center md:justify-between items-center">
              <div className='flex flex-col justify-center items-center md:items-start'>
                <h1 className="text-3xl font-bold mb-2">Bienvenue, {parsedUser.nom}</h1>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl shadow p-5 flex items-center">
                
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <Car className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Réservations en attente</p>
                <p className="text-2xl font-bold text-gray-800"><CountUp end={stats.reservationsActives} duration={'1'}/></p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow p-5 flex items-center">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <Calendar className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Réservations passées</p>
                <p className="text-2xl font-bold text-gray-800"><CountUp end={stats.reservationsPassees} duration={'1'}/></p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl shadow p-5 flex items-center">
              <div className="rounded-full bg-purple-100 p-3 mr-4">
                <Settings className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Réservation</p>
                <p className="text-2xl font-bold text-gray-800"><CountUp end={totalReservation} duration={'1'} /></p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl shadow p-5 flex items-center">
              <div className="rounded-full bg-red-100 p-3 mr-4">
                <CarFront className="text-red-600" size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Nombres de voitures reservés</p>
                <p className="text-2xl font-bold text-gray-800"><CountUp end={nbrVoitureReserve} duration={'1'} /></p>
              </div>
            </motion.div>
          </div>

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
                  {reservations
                    .filter(r => r.statut !== 'annulée' && r.statut !== 'expiré')
                    .map((reservation) => (
                      <tr key={reservation.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {reservation.voiture?.car_name || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{reservation.dateDebut.split('T')[0]}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{reservation.dateFin.split('T')[0]}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={
                            `px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              reservation.statut === 'confirmée'
                                ? 'bg-green-100 text-green-800'
                                : reservation.statut === 'en attente'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-600'
                            }`
                          }>
                            {reservation.statut}
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

        </motion.div>
      </main>
    </div>
  );
};

export default DashboardClient;