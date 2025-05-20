import { useEffect, useState } from 'react';
import SidebarClient from './SidebarClient';
import axios from '../../../config/Axios';

const ReserverVoiture = () => {
  const [voitures, setVoitures] = useState([]);
  const [formData, setFormData] = useState({ voiture_id: '', dateDebut: '', dateFin: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/voitures')
      .then(res => setVoitures(res.data))
      .catch(() => setVoitures([]));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/user/reservations/my', formData);
      setMessage('Réservation effectuée avec succès !');
    } catch (error) {
      setMessage('Erreur lors de la réservation.');
    }
  };

  return (
    <div className="pt-16 flex flex-col md:flex-row bg-gray-100 min-h-screen">
      <SidebarClient />
      <main className="flex-1 p-6">
        <h2 className="text-xl font-bold mb-4">Réserver une voiture</h2>
        {message && <p className="mb-4 text-center text-sm text-green-600">{message}</p>}
        <form className="bg-white p-6 shadow rounded flex flex-col gap-4" onSubmit={handleSubmit}>
          <select name="voiture_id" className="border p-2 rounded" onChange={handleChange} required>
            <option value="">Sélectionnez une voiture</option>
            {voitures.map(v => <option key={v.id} value={v.id}>{v.car_name} - {v.car_model}</option>)}
          </select>
          <input type="date" name="dateDebut" className="border p-2 rounded" onChange={handleChange} required />
          <input type="date" name="dateFin" className="border p-2 rounded" onChange={handleChange} required />
          <button type="submit" className="bg-blue-600 text-white py-2 rounded">Réserver</button>
        </form>
      </main>
    </div>
  );
};

export default ReserverVoiture;