/*
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import AssessmentOutlined from "@mui/icons-material/AssessmentOutlined";
import { Link } from "react-router-dom";
import { useAuth, slugify } from "../../../../AuthContext";
*/
/*

const Sidebar = () => {
  const {user} = useAuth();
  const fullSlug = encodeURIComponent(`${slugify(user.nom)}-${slugify(user.prenom)}`);

  return (
    <div className="bg-white flex-1 border-r border-gray-300 min-h-screen">
      <div className="h-[50px] flex items-center justify-center">
        <Link to="/" className="decoration-none color-inherit">
          {" "}
          <span className="text-[30px] font-bold text-red-500 cursor-pointer">Admin</span>
        </Link>
      </div>
      <hr className="h-[2px] bg-gray-300 border-none mx-0 my-auto" />
      <div className="pl-[10px]">
        <ul className="list-none p-0 m-0">
          <p className=" text-gray-500 font-bold text-[15px] mt-[15px] mb-[5px]">Menu</p>
          <li className="flex items-center p-[10px] mr-[10px] cursor-pointer hover:bg-gray-200 rounded">
            <Link to={`/${user.role}/dashboard/${user.id}/${fullSlug}`} className="decoration-none color-inherit">
              <DashboardIcon className="text-pink-500 text-[20px] " />
              <span className="ml-[10px] text-[15px] text-gray-500">Dashbord</span>
            </Link>
          </li>
          <p className=" text-gray-500 font-bold text-[15px] mt-[15px] mb-[5px]">List</p>
         <li className="flex items-center p-[10px] mr-[10px] cursor-pointer hover:bg-gray-200 rounded">
            <Link to="/admin/utilisateurs" className="decoration-none color-inherit">
              <PersonOutlinedIcon className="text-pink-500 text-[20px]" />
              <span className="ml-[10px] text-[15px] text-gray-500">Utilisateurs</span>
            </Link>
          </li>
          <li className="flex items-center p-[10px] mr-[10px] cursor-pointer hover:bg-gray-200 rounded">
            <Link to="/admin/voitures" className="decoration-none color-inherit">
              <InventoryIcon className="text-pink-500 text-[20px]" />
              <span className="ml-[10px] text-[15px] text-gray-500">Voitures</span>
            </Link>
          </li>
          <li className="flex items-center p-[10px] mr-[10px] cursor-pointer hover:bg-gray-200 rounded">
            <Link to="/reservation" className="decoration-none color-inherit">
              <BorderAllIcon className="text-pink-500 text-[20px]" />
              <span className="ml-[5px] text-[15px] text-gray-500">Reservations</span>
            </Link>
          </li>
          <p className=" text-gray-500 font-bold text-[15px] mt-[15px] mb-[5px]">Useful</p>
          <li className="flex items-center p-[10px] mr-[10px] cursor-pointer hover:bg-gray-200 rounded">
            <Link to="/stats" className="decoration-none color-inherit">
              {" "}
              <AssessmentOutlined className="text-pink-500 text-[20px]" />
              <span className="ml-[10px] text-[15px] text-gray-500"> stats</span>
            </Link>
          </li>
          <p className="text-gray-500 font-bold text-[15px] mt-[15px] mb-[5px]">Service</p>
          <li className="flex items-center p-[10px] mr-[10px] cursor-pointer hover:bg-gray-200 rounded">
            <Link to="/health" className="decoration-none color-inherit">
              <PsychologyOutlinedIcon className="text-pink-500 text-[20px]" />
              <span className="ml-[10px] text-[15px] text-gray-500">Logs</span>
            </Link>
          </li>
          
          <p className=" text-gray-500 font-bold text-[15px] mt-[15px] mb-[5px]">User</p>
          <li className="flex items-center p-[10px] mr-[10px] cursor-pointer hover:bg-gray-200 rounded">
            <Link to="/users/single" className="decoration-none color-inherit">
              <AccountCircleRoundedIcon className="text-pink-500 text-[20px]" />
              <span className="ml-[10px] text-[15px] text-gray-500">Profile</span>
            </Link>
          </li>
          <li className="flex items-center p-[10px] mr-[10px] cursor-pointer hover:bg-gray-200 rounded">
            <Link to="/" className="decoration-none color-inherit">
              <LogoutIcon className="text-pink-500 text-[20px]" />
              <span className="ml-[10px] text-[15px] text-gray-500">Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;*/

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Car, 
  Calendar, 
  Home, 
  LogOut, 
  Settings,
  ChevronRight,
  Menu,
  X,
  CarFront,
  User2
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const user = localStorage.getItem('user');
  let parsedUser;
  try {
    parsedUser = JSON.parse(user);
  } catch (error) {
    console.error('Erreur lors du parsing de l\'utilisateur :', error);
    return;
  }

  const slugify = (str) => {
  if (!str) return '';
  return str
    .normalize('NFD') // Décomposer les caractères accentués
    .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Supprimer les caractères non alphanumériques
    .replace(/\s+/g, '-') // Remplacer les espaces par des tirets
    .replace(/-+/g, '-') // Supprimer les tirets multiples
    .trim(); // Supprimer les tirets en début/fin
  };
  const fullSlug = encodeURIComponent(`${slugify(parsedUser.nom)}-${slugify(parsedUser.prenom)}`);

const menuItems = [
  { name: 'Dashboard', icon: <Home size={20} />, path: `/${parsedUser.role}/dashboard/${parsedUser.id}/${fullSlug}` },
  { name: 'Réservations', icon: <Calendar size={20} />, path: `/${parsedUser.role}/reservation` },
  {name: 'Voitures', icon: <CarFront size={20} />, path: `/${parsedUser.role}/voitures`},
  {name: 'utilisateurs', icon: <User2 size={20} />, path: `/${parsedUser.role}/utilisateurs`},
  { name: 'Mon Profil', icon: <User size={20} />, path: `/${parsedUser.role}/my/profil/${parsedUser.id}` },
  { name: 'Paramètres', icon: <Settings size={20} />, path: `/${parsedUser.role}/settings/${parsedUser.id}` },
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

export default Sidebar;
