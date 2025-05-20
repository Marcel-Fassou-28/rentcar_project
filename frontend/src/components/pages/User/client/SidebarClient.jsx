import { Link } from 'react-router-dom';

const SidebarClient = () => {
  return (
    <aside className="w-full md:w-1/4 lg:w-1/5 p-4 bg-white shadow h-full">
      <nav className="flex flex-col gap-4">
        <Link to="/client/dashboard" className="text-blue-600 font-semibold">Dashboard</Link>
        <Link to="/client/mes-reservations" className="text-gray-600 hover:text-blue-600">Mes Réservations</Link>
        <Link to="/client/reserver" className="text-gray-600 hover:text-blue-600">Réserver une Voiture</Link>
        <Link to="/client/mon-profil" className="text-gray-600 hover:text-blue-600">Mon Profil</Link>
      </nav>
    </aside>
  );
};

export default SidebarClient;