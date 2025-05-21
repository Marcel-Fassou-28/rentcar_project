import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Car, 
  Calendar, 
  Home, 
  Bell, 
  LogOut, 
  Settings,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const SidebarClient = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

const menuItems = [
  { name: 'Dashboard', icon: <Home size={20} />, path: '/client/dashboard' },
  { name: 'Mes Réservations', icon: <Calendar size={20} />, path: '/client/mes-reservations' },
  { name: 'Réserver une Voiture', icon: <Car size={20} />, path: '/client/reserver' },
  { name: 'Notifications', icon: <Bell size={20} />, path: '/client/notifications', badge: 3 },
  { name: 'Mon Profil', icon: <User size={20} />, path: '/client/mon-profil' },
  { name: 'Paramètres', icon: <Settings size={20} />, path: '/client/parametres' },
];



  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Bouton mobile pour ouvrir la sidebar */}
      <div className="md:hidden fixed bottom-4 right-4 z-10">
        <button 
          onClick={toggleMobileSidebar} 
          className="bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay pour mobile */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -50, opacity: 0 }}
        animate={{ 
          x: 0, 
          opacity: 1,
          width: isCollapsed ? '80px' : '280px'
        }}
        transition={{ duration: 0.3 }}
        className={`
          fixed top-16 left-0 z-10 h-[calc(100vh-4rem)] bg-white shadow-lg
          transform transition-all duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:relative md:translate-x-0
        `}
        style={{ width: isCollapsed ? '80px' : '280px' }}
      >
        <div className="h-full flex flex-col justify-between">
          <div className="px-3 py-4">
            {/* Logo et nom de l'entreprise */}
            <div className="flex items-center justify-center mb-8">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-full p-2 text-white">
                <Car size={isCollapsed ? 24 : 32} />
              </div>
              {!isCollapsed && (
                <motion.h1 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="ml-3 font-bold text-xl text-gray-800"
                >
                  RentCar
                </motion.h1>
              )}
            </div>

            {/* Menu de navigation */}
            <nav className="mt-6 flex flex-col gap-2">
              {menuItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link 
                    key={index}
                    to={item.path}
                    className={`
                      flex items-center px-3 py-3 rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md' 
                        : 'text-gray-600 hover:bg-orange-50'
                      }
                      ${isCollapsed ? 'justify-center' : 'justify-between'}
                    `}
                  >
                    <div className="flex items-center">
                      <div className={`${isActive ? 'text-white' : 'text-orange-500'}`}>
                        {item.icon}
                      </div>
                      
                      {!isCollapsed && (
                        <motion.span 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="ml-3 font-medium"
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </div>

                    {!isCollapsed && (
                      <>
                        {item.badge && (
                          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            {item.badge}
                          </span>
                        )}
                        {!item.badge && isActive && (
                          <ChevronRight size={18} />
                        )}
                      </>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Section inférieure */}
          <div className="mt-auto px-3 py-4 border-t">
            <Link 
              to="/logout" 
              className={`
                flex items-center px-3 py-3 rounded-lg transition-all duration-200
                text-red-500 hover:bg-red-50
                ${isCollapsed ? 'justify-center' : ''}
              `}
            >
              <LogOut size={20} />
              {!isCollapsed && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="ml-3 font-medium"
                >
                  Déconnexion
                </motion.span>
              )}
            </Link>

            {/* Bouton pour réduire/agrandir la sidebar (visible uniquement sur desktop) */}
            <button 
              onClick={toggleSidebar}
              className="hidden md:flex items-center justify-center mt-4 w-full px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-all duration-200"
            >
              <ChevronRight 
                size={20} 
                className={`transform transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} 
              />
              {!isCollapsed && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="ml-3 text-sm"
                >
                  Réduire
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default SidebarClient;


