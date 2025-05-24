import EvStationIcon from '@mui/icons-material/EvStation';
import SpeedIcon from '@mui/icons-material/Speed';// Replaced MUI icons for consistency
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { Car, Clock, Key, VoteIcon } from 'lucide-react';
import { div } from 'framer-motion/client';

const Model = ({ voiture }) => {
  const { user } = useAuth();

  const statusIcons = {
    disponible: <Car className="text-green-500" />,
    reservé: <Clock className="text-yellow-500" />,
    loué: <Key className="text-blue-500" />,
  };

  const isAdmin = user?.role === 'admin';
  const linkProps = isAdmin
    ? { to: `/${user.role}/voitures/modifyCar/${voiture.id}`, label: 'Modifier' }
    : { to: `/${user.role}/reserver`, label: 'Réserver' };

  return (
    <div className="w-full max-w-[300px] rounded-xl bg-white shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow mx-auto">
      <div className="relative">
        <img
          src={voiture.car_photo || ''} // Fallback image
          alt={`${voiture.car_name} photo`}
          className="w-full h-48 md:h-40 lg:h-48 object-cover scale-90 rounded-lg hover:transform hover:scale-100 transition duration-300"
        />
        <Link
          to={linkProps.to}
          className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold px-4 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-colors"
          aria-label={linkProps.label}
        >
          {linkProps.label}
        </Link>
        <div className="absolute bottom-0 right-0 hover:scale-105 cursor-pointer transition duration-200 hover:bg-orange-600 bg-orange-500 text-white rounded-tl-[30px] px-4 py-2 flex items-center gap-2">
          <span className="font-semibold">À partir de {voiture.price} DHS</span>
          <div className="h-5 w-px bg-white" />
          <span>jour</span>
        </div>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className="font-semibold text-xl uppercase mt-4 mb-2 text-gray-900">{voiture.car_name}</h1> 
        <span className='text-sm font-semibold uppercase mt-4 mb-2 text-gray-700'>Place : {(voiture.place)}</span>
      </div>
      <hr className="border-gray-200" />
      <div className="flex justify-between mt-3 text-gray-600">
        <span className="flex items-center gap-2">
          <EvStationIcon size={20} />
          {voiture.moteur || 'N/A'}
        </span>
        <span className="flex items-center gap-2">
  {statusIcons[voiture.statut]}
  <span className="capitalize">{voiture.statut}</span>
</span>
        <span className="flex items-center gap-2 hover:text-orange-600 cursor-pointer">
          <SpeedIcon size={20} />
          {voiture.transmission || 'N/A'}
        </span>
      </div>
    </div>
  );
};

export default Model;
