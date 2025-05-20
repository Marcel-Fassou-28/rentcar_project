import { useEffect, useState } from 'react';
import SidebarClient from './SidebarClient';
import axios from '../../../config/Axios';
import { useAuth } from "../../../../components/AuthContext";
const ProfilClient = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ nom: '', email: '', telephone: '', adresse: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`/user/profil/${user.id}`)
      .then(res => setFormData(res.data))
      .catch(() => setMessage("Erreur lors du chargement"));
  }, [user.id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.patch(`/user/profil/update/${user.id}`, formData);
      setMessage('Profil mis à jour avec succès.');
    } catch (err) {
      setMessage("Erreur lors de la mise à jour.");
    }
  };

  return (
    <div className="pt-16 flex flex-col md:flex-row bg-gray-100 min-h-screen">
      <SidebarClient />
      <main className="flex-1 p-6">
        <h2 className="text-xl font-bold mb-4">Mon Profil</h2>
        {message && <p className="mb-2 text-sm text-center text-green-600">{message}</p>}
        <form className="bg-white shadow rounded p-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <input name="nom" value={formData.nom} onChange={handleChange} type="text" placeholder="Nom" className="border p-2 rounded" />
          <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" className="border p-2 rounded" />
          <input name="telephone" value={formData.telephone} onChange={handleChange} type="text" placeholder="Téléphone" className="border p-2 rounded" />
          <input name="adresse" value={formData.adresse} onChange={handleChange} type="text" placeholder="Adresse" className="border p-2 rounded" />
          <button type="submit" className="bg-blue-600 text-white py-2 rounded">Mettre à jour</button>
        </form>
      </main>
    </div>
  );
};

export default ProfilClient;