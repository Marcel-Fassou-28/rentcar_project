import { Settings, Trash2, User, Edit2Icon } from 'lucide-react';
import SidebarClient from './SidebarClient';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import instance from '../../../config/Axios';
import { useAuth } from '../../../AuthContext';

function Setting() {
  const {user} = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      const response = await instance.delete(`/user/delete/${user.id}`);
      setMessage(response.data.message);
      setError(null);
      setShowModal(false);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue lors de la suppression.');
      setMessage(null);
      setShowModal(false);
    }
  };

  return (
    <div className="pt-16 flex flex-col md:flex-row bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
      <SidebarClient />
      <main className="flex-1 p-6">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white mx-auto my-4 w-[95%]">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Settings</h1>
              <p className="text-orange-100">Gérer votre compte !!</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center">
              <div className="bg-white text-orange-600 p-2 rounded-full">
                <Settings size={24} />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mx-auto my-4 w-[95%]">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Profil</h2>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
              {user.photo ? (
                <img
                  src={user.photo}
                  alt="Photo de profil"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={40} className="text-gray-600" />
              )}
            </div>
            <button
              className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              aria-label="Éditer le profil"
            >
              <Edit2Icon size={20} />
              <Link to={`/${user.role}/my/profil/${user.id}`}>Éditer votre profil</Link>
            </button>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mx-auto my-4 w-[95%]">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Supprimer le compte</h2>
          <p className="text-gray-600 mb-6">
            La suppression de votre compte est irréversible. Toutes vos données, y compris les réservations et informations personnelles, seront définitivement effacées.
          </p>
          {message && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
              {message}
            </div>
          )}
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            aria-label="Supprimer le compte"
          >
            <Trash2 size={20} />
            Supprimer mon compte
          </button>
        </div>
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[90%] max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirmer la suppression</h3>
              <p className="text-gray-600 mb-6">
                Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.
              </p>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 size={20} />
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Setting;
