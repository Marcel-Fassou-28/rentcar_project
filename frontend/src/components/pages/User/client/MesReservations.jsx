import { useEffect, useState } from 'react';
import SidebarClient from './SidebarClient';
import axios from '../../../config/Axios';

const MesReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios.get('/user/reservations/my')
      .then(res => setReservations(res.data))
      .catch(() => setReservations([]));
  }, []);

  return (
    <div className="pt-16 flex flex-col md:flex-row bg-gray-100 min-h-screen">
      <SidebarClient />
      <main className="flex-1 p-6">
        <h2 className="text-xl font-bold mb-4">Mes Réservations</h2>
        <div className="bg-white shadow rounded p-4">
          {reservations.length === 0 ? (
            <p>Aucune réservation trouvée.</p>
          ) : (
            <table className="w-full text-left border">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Voiture</th>
                  <th className="p-2">Début</th>
                  <th className="p-2">Fin</th>
                  <th className="p-2">Statut</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((r) => (
                  <tr key={r.id} className="border-b">
                    <td className="p-2">{r.voiture?.car_name || 'N/A'}</td>
                    <td className="p-2">{r.dateDebut}</td>
                    <td className="p-2">{r.dateFin}</td>
                    <td className="p-2">{r.statut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default MesReservations;
