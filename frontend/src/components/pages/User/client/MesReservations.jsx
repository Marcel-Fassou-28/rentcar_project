import { useEffect, useState } from 'react';
import SidebarClient from './SidebarClient';
import axios from '../../../config/Axios';
import { CalendarDays, Car, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const MesReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = () => {
    setLoading(true);
    axios.get('/user/reservations/my')
      .then(res => {
        setReservations(res.data);
        setLoading(false);
      })
      .catch(() => {
        setReservations([]);
        setLoading(false);
      });
  };

const supprimerReservation = async (id) => {
  try {
    await axios.delete(`/user/reservations/my/${id}`);
    fetchReservations(); // Recharge la liste
  } catch (error) {
    console.error('Erreur lors de la suppression :', error);
  }
};


  const getStatusColor = (statut) => {
    switch ((statut || '').toLowerCase()) {
      case 'confirmée':
        return 'bg-green-100 text-green-800';
      case 'en attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'annulée':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toISOString().split('T')[0]; // YYYY-MM-DD
  };

  return (
    <div className="pt-16 bg-gradient-to-b from-gray-50 to-gray-100 flex">
      <SidebarClient />
      <main className="flex-1 p-6 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <CalendarDays className="text-orange-500" />
            Mes Réservations
          </h2>
          <p className="text-gray-600 mt-1">Consultez toutes vos réservations en cours et passées</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
        >
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : reservations.length === 0 ? (
            <div className="text-center py-10">
              <Car className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">Aucune réservation trouvée.</p>
              <p className="text-gray-400 mt-2">Vos futures réservations apparaîtront ici.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="p-4 font-semibold text-gray-600">Voiture</th>
                    <th className="p-4 font-semibold text-gray-600">Début</th>
                    <th className="p-4 font-semibold text-gray-600">Fin</th>
                    <th className="p-4 font-semibold text-gray-600">Statut</th>
                    <th className="p-4 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((r) => (
                    <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="p-4 flex items-center gap-2">
                        <Car className="text-orange-500" size={18} />
                        <span className="font-medium">{r.voiture?.car_name || 'N/A'}</span>
                      </td>
                      <td className="p-4">
                        <Clock size={16} className="text-gray-400 inline mr-2" />
                        {formatDate(r.dateDebut)}
                      </td>
                      <td className="p-4">
                        <Clock size={16} className="text-gray-400 inline mr-2" />
                        {formatDate(r.dateFin)}
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(r.statut)}`}>
                          {r.statut || 'N/A'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <button
                            className="text-blue-600 hover:text-blue-800 transition-colors font-medium text-sm"
                            onClick={() => console.log('Voir détails', r.id)}
                          >
                            Voir détails
                          </button>
                          {r.statut === 'en attente' && (
                            <button
                              onClick={() => supprimerReservation(r.id)}
                              className="text-red-600 hover:text-red-800 transition-colors font-medium text-sm"
                            >
                              Annuler
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default MesReservations;
