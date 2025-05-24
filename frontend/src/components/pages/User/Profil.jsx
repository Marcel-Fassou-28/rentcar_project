import { useEffect, useState, useCallback } from 'react';
import SidebarClient from './client/SidebarClient';
import axios from '../../config/Axios';
import { useAuth } from "../../AuthContext";
import { User, Mail, Phone, Home, Save, AlertCircle, CheckCircle, Calendar, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import Cropper from 'react-easy-crop';
import Sidebar from './admin/composants/Sidebar';

const Profil = () => {
  const { user} = useAuth(); // Récupérez user et login depuis le contexte
  const [formData, setFormData] = useState({
    id: user?.id || '',
    nom: user?.nom || '',
    prenom: user?.prenom || '',
    email: user?.email || '',
    telephone: user?.telephone || '',
    birthday: user?.birthday || '',
    adresse: user?.adresse || '',
    photo: user?.photo || ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(user.photo || '');

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const response = await axios.get(`/user/profil/${user.id}`);
        setFormData(prev => ({ ...prev, ...response.data }));
      } catch (err) {
        setMessage(err.response?.data?.message || 'Erreur lors du chargement des données');
        setMessageType('error');
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [user?.id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCrop = async () => {
    try {
      const croppedImage = await getCroppedImg(previewUrl, croppedAreaPixels, photoFile);
      setPhotoFile(croppedImage);
      setPreviewUrl(URL.createObjectURL(croppedImage));
      setShowCropper(false);
      handleChange({ target: { name: 'photo', value: croppedImage.name } });
    } catch (e) {
      setError('Erreur lors du recadrage de l’image');
      console.error('Error cropping image:', e);
    }
  };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validExtensions = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validExtensions.includes(file.type)) {
        setError('Veuillez sélectionner un fichier JPEG ou PNG.');
        return;
      }
      setPhotoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setShowCropper(true);
      setError(null);
    }
  };

  const getCroppedImg = async (imageSrc, pixelCrop, originalFile) => {
    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    const mimeType = originalFile.type === 'image/png' ? 'image/png' : 'image/jpeg';
  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        const file = new File([blob], originalFile.name, { type: mimeType });
        resolve(file);
      },
      mimeType,
      0.9 // Quality for JPEG
    );
  });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setUpdating(true);

    if (photoFile) {
      const base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(photoFile);
      });
  
      formData.photo = {
        name: photoFile.name,
        data: base64Image, // Contient l'image en base64 (ex. "data:image/jpeg;base64,...")
      };
    } else {
      formData.photo = {
        name: null,
        data: null,
      }
    }
  
    try {
      console.log(formData);
      const response = await axios.patch(`/user/profil/update/${user.id}`, formData);
      setMessage('Profil mis à jour avec succès !');
      setMessageType('success');
      setTimeout(() => setMessage(''), 5000);
      localStorage.setItem('user', JSON.stringify(response.data.data));
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
      window.location.reload();
    }, 1000);
      
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
        {user.role == 'client' ?<SidebarClient /> : <Sidebar/>}
        <main className="flex-1 p-6 md:p-8 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </main>
      </div>
    );
  }

  return (
    <div className="pt-16 bg-gradient-to-b from-gray-50 to-gray-100 flex">
      {user.role == 'client' ? <SidebarClient /> : <Sidebar/>}
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
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-orange-500 mx-auto mb-4 relative">
          <img src={previewUrl || formData.photo || ''} alt="Profile" className="rounded-full object-cover w-full h-full" />
          <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-orange-500 rounded-full p-2 cursor-pointer hover:bg-orange-600">
            <Camera size={18} className="text-white" />
            <input
              id="photo-upload"
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>
        </div>
        <h3 className="text-center text-white text-xl font-bold">{user.nom || 'Utilisateur'}</h3>
        <p className="text-center text-orange-100">{user.email || 'email@exemple.com'}</p>
      </div>

      {showCropper && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <div className="relative w-full h-64">
              <Cropper
                image={previewUrl}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                showGrid={true}
                cropShape="round"
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowCropper(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Annuler
              </button>
              <button
                onClick={handleCrop}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
              >
                Valider
              </button>
            </div>
          </div>
        </div>
      )}

          <form className="p-6 flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Nom </label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  name="nom" 
                  value={formData.nom} 
                  onChange={handleChange} 
                  type="text" 
                  placeholder="Votre nom" 
                  className="border border-gray-300 p-3 pl-10 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Prénom </label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  name="prenom" 
                  value={formData.prenom} 
                  onChange={handleChange} 
                  type="text" 
                  placeholder="Votre prénom" 
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
              <label className="text-sm font-medium text-gray-600">Birthday</label>
              <div className="relative">
                <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  name="birthday" 
                  value={formData.birthday} 
                  onChange={handleChange} 
                  type="date" 
                  placeholder="Birthday" 
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

export default Profil;