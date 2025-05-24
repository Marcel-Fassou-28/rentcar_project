import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, UserCircle, Menu, X, Home, CarFront, Info, Contact, LogOut } from 'lucide-react';
import { useAuth } from './AuthContext';
import Logo from './../assets/Logo.svg';

// Fonction slugify
const slugify = (str) => {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

const Navbar = () => {
  const { token, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Memoize user data
  const { role, id, slug, photo } = useMemo(() => {
    if (!user) return { role: null, id: null, slug: '', photo: 'avatar.png' };
    const nom = user.nom || '';
    const prenom = user.prenom || '';
    const fullSlug = nom && prenom ? encodeURIComponent(`${slugify(nom)}-${slugify(prenom)}`) : '';
    return { role: user?.role || null, id: user?.id || null, slug: fullSlug, photo: user?.photo };
  }, [user]);

  // Menu items
  const menuItems = useMemo(
    () =>
      token && id && slug && role
        ? [
            { to: `/${role}/dashboard/${id}/${slug}`, label: 'Dashboard', icon: <Home size={20} /> },
            { to: `/${role}/models`, label: 'Models', icon: <CarFront size={20} /> },
            { to: `/${role}/reservation`, label: 'Reservation', icon: <CarFront size={20} /> },
            { to: '/contact', label: 'Contact', icon: <Contact size={20} /> },
          ]
        : [
            { to: '/', label: 'Home', icon: <Home size={20} /> },
            { to: '/models', label: 'Models', icon: <CarFront size={20} /> },
            { to: '/about', label: 'About', icon: <Info size={20} /> },
            { to: '/contact', label: 'Contact', icon: <Contact size={20} /> },
          ],
    [token, id, slug, role]
  );

  return (
    <nav className="fixed top-0 w-full py-3 bg-white flex items-center justify-between shadow-sm h-16 z-50 px-4">
      {/* Hamburger (mobile) */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
          className="p-2 rounded-md hover:bg-orange-500 transition duration-200"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Logo */}
      <div className="flex items-center">
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-10 md:h-12 lg:h-14 cursor-pointer" />
        </Link>
      </div>

      {/* Desktop Menu */}
      {token ? <div className="hidden md:flex absolute left-[57.5%] transform -translate-x-1/2 space-x-8 lg:space-x-16">
        {menuItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="font-semibold text-gray-700 hover:text-orange-500 transition duration-200"
          >
            {item.label}
          </Link>
        ))}
      </div> : 
       <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8 lg:space-x-16">
        {menuItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="font-semibold text-gray-700 hover:text-orange-500 transition duration-200"
          >
            {item.label}
          </Link>
        ))}
      </div>}

      {/* Desktop Profile and Buttons */}
      <div className="flex items-center space-x-3 lg:space-x-8">
        {token ? (
          <div className="flex items-center space-x-4">
            {/* Photo de profil */}
            <Link to={`${role}/my/profil/${id}`} aria-label="Profil">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center"
              >
                <img src={`${photo}`} alt="" className='w-8 h-8 rounded-full border-none outline outline-orange-500' />
                
              </motion.div>
            </Link>
            {/* Lien de déconnexion */}
            <Link
              to="/deconnexion"
              onClick={logout}
              className="flex items-center px-2 py-1.5 border border-black rounded-md text-black font-semibold hover:bg-orange-500 hover:text-white transition duration-200"
              aria-label="Déconnexion"
            >
              <LogOut className="w-4 h-4 mr-1.5" />
              <span className="hidden lg:inline">Déconnexion</span>
            </Link>
          </div>
        ) : (
          <div className="flex items-center space-x-2 lg:space-x-3">
            <Link
              to="/login"
              className="flex items-center px-2 py-1.5 border border-black rounded-md text-black font-semibold hover:bg-orange-500 hover:text-white transition duration-200"
              aria-label="Connexion"
            >
              <UserCircle className="w-4 h-4 mr-1.5" />
              <span className="hidden lg:inline">Connexion</span>
              
            </Link>
            <Link
              to="/register"
              className="flex items-center px-2 py-1.5 border border-black rounded-md text-black font-semibold hover:bg-orange-500 hover:text-white transition duration-200"
              aria-label="S'inscrire"
            >
              <UserPlus className="w-4 h-4 mr-1.5" />
              <span className="hidden lg:inline">S'inscrire</span>
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-16 left-0 w-full bg-gray-50 shadow-md z-30"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col items-start pt-4 pb-2">
              {menuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex gap-3 font-semibold w-full py-2 px-4 text-gray-700 hover:bg-orange-500 hover:text-white transition duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
              {token && (
                <Link
                  to="/deconnexion"
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="flex gap-3 font-semibold w-full py-2 px-4 text-gray-700 hover:bg-orange-500 hover:text-white transition duration-200"
                >
                  <LogOut size={20} />
                  Déconnexion
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
