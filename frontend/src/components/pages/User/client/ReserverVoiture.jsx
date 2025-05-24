import { useEffect, useState } from 'react';
import SidebarClient from './SidebarClient';
import axios from '../../../config/Axios';
import { Car, Calendar, Check, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ReserverVoiture = () => {
  const [voitures, setVoitures] = useState([]);
  const [formData, setFormData] = useState({ voiture_id: '', dateDebut: '', dateFin: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    setLoading(true);
    axios.get('/voitures')
      .then(res => {
        console.log('voitures:', res.data); // pour voir la structure
        // ✅ adapte ici selon ta structure API
        const cars = res.data?.data ?? res.data;
        setVoitures(Array.isArray(cars) ? cars : []);
        setLoading(false);
      })
      .catch(() => {
        setVoitures([]);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'voiture_id') {
      const selected = voitures.find(v => v.id.toString() === value);
      setSelectedCar(selected || null);
    }
  };

  const validateForm = () => {
    const { voiture_id, dateDebut, dateFin } = formData;
    if (!voiture_id) return "Veuillez sélectionner une voiture";
    if (!dateDebut) return "Veuillez sélectionner une date de début";
    if (!dateFin) return "Veuillez sélectionner une date de fin";
    
    const start = new Date(dateDebut);
    const end = new Date(dateFin);
    
    if (start >= end) return "La date de fin doit être postérieure à la date de début";
    if (start < new Date()) return "La date de début ne peut pas être dans le passé";
    
    return null;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const error = validateForm();

  if (error) {
    setMessage(error);
    setMessageType('error');
    return;
  }

  setSubmitting(true);

  try {
await axios.post('/user/reservations/my', {
  idVoiture: formData.voiture_id,
  dateDebut: formData.dateDebut,
  dateFin: formData.dateFin,
  montant_total: selectedCar?.price || 0 
});



    setMessage('Votre demande de réservation a bien été envoyée.');
    setMessageType('success');
    setFormData({ voiture_id: '', dateDebut: '', dateFin: '' });
    setSelectedCar(null);
  } catch (error) {
    console.error('Erreur lors de la réservation', error);
    setMessage('Une erreur est survenue lors de la réservation.');
    setMessageType('error');
  } finally {
    setSubmitting(false);
    setTimeout(() => setMessage(''), 5000);
  }
};


  const today = new Date().toISOString().split('T')[0];
  const minEndDate = formData.dateDebut || today;

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
            <Car className="text-orange-500" />
            Réserver une voiture
          </h2>
          <p className="text-gray-600 mt-1">Choisissez votre véhicule et planifiez votre réservation</p>
        </motion.div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-5 p-4 rounded-md flex items-center gap-2 ${
              messageType === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}
          >
            {messageType === 'success' ? (
              <Check size={18} className="text-green-500" />
            ) : (
              <AlertCircle size={18} className="text-red-500" />
            )}
            <p>{message}</p>
          </motion.div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white shadow-lg rounded-lg border border-gray-200 p-6 lg:w-1/2"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="text-orange-500" size={20} />
              Détails de réservation
            </h3>

            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
              </div>
            ) : (
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-600">Voiture</label>
                  <select 
                    name="voiture_id" 
                    className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white" 
                    onChange={handleChange} 
                    value={formData.voiture_id}
                    required
                  >
                    <option value="">Sélectionnez une voiture</option>
                    {Array.isArray(voitures) && voitures.map(v => (
                      <option key={v.id} value={v.id}>
                        {v.car_name} - {v.car_model}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-600">Date de début</label>
                  <input 
                    type="date" 
                    name="dateDebut" 
                    min={today}
                    value={formData.dateDebut}
                    className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-600">Date de fin</label>
                  <input 
                    type="date" 
                    name="dateFin" 
                    min={minEndDate}
                    value={formData.dateFin}
                    className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={submitting}
                  className="mt-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-md font-medium flex items-center justify-center gap-2 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                      Traitement en cours...
                    </>
                  ) : (
                    <>
                      <Car size={18} />
                      Réserver maintenant
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white shadow-lg rounded-lg border border-gray-200 p-6 lg:w-1/2"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Car className="text-orange-500" size={20} />
              Aperçu du véhicule
            </h3>

            {selectedCar ? (
              <div className="flex flex-col gap-4">
                <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center">
                  {selectedCar.car_photo ? (
                    <img
  src={`http://127.0.0.1:8000/storage/Vehicule/${selectedCar.car_photo}`}
  alt={selectedCar.car_name}
  className="max-h-full object-contain"
/>



                  ) : (
                    <Car size={80} className="text-gray-400" />
                  )}
                </div>
                
                <h4 className="text-xl font-semibold">{selectedCar.car_name} - {selectedCar.car_model}</h4>
                
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm font-medium text-gray-500">Catégorie</p>
                    <p className="font-medium">{selectedCar.category || 'Standard'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm font-medium text-gray-500">Année</p>
                    <p className="font-medium">{selectedCar.year || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm font-medium text-gray-500">Places</p>
                    <p className="font-medium">{selectedCar.seats || '5'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm font-medium text-gray-500">Transmission</p>
                    <p className="font-medium">{selectedCar.transmission || 'Automatique'}</p>
                  </div>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg mt-2">
                  <p className="text-orange-800 font-semibold">Prix par jour</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {selectedCar.price || '500'}MAD
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Car size={60} className="text-gray-300 mb-4" />
                <p className="text-gray-500">Sélectionnez une voiture pour voir les détails</p>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ReserverVoiture;
