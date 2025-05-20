import { UserPlus, UserCircle, Menu, X, Home, CarFront, Info, Contact, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './../assets/Logo.svg';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { div } from 'framer-motion/client';

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

  // Memoize id and slug
  const { role, id, slug } = useMemo(() => {
    if (!user) return { id: null, slug: '' };
    const nom = user.nom || '';
    const prenom = user.prenom || '';
    const fullSlug = nom && prenom ? encodeURIComponent(`${slugify(nom)}-${slugify(prenom)}`) : '';
    return {
      role: user?.role || null,
      id: user?.id || null,
      slug: fullSlug,
    };
  }, [user]);

  // Common menu items
  const commonMenuItems = useMemo(
    () => [
      { to: '/models', label: 'Models', icon: <CarFront size={20} /> },
    ],
    []
  );

  // Menu items based on authentication status
  const menuItems = useMemo(
    () =>
      token && id && slug && role
        ? [{ to: `/${role}/dashboard/${id}/${slug}`, label: 'Dashboard', icon: <Home size={20} /> },
           ...commonMenuItems, 
           { to: `/${role}/reservation`, label: 'Reservation', icon: <CarFront size={20} /> },
          { to: '/contact', label: 'Contact', icon: <Contact size={20} /> },]
        : [
            { to: '/', label: 'Home', icon: <Home size={20} /> },
            ...commonMenuItems,
            { to: '/about', label: 'About', icon: <Info size={20} /> },
            { to: '/contact', label: 'Contact', icon: <Contact size={20} /> },
          ],
    [token, id, slug, commonMenuItems]
  );

  return (
    <nav className="fixed w-full py-4 bg-white flex flex-row justify-between items-center shadow-sm h-16 z-10">
      {/* Hamburger (mobile/tablet) */}
      <div className="md:hidden hover:bg-orange-500 pt-1 ml-2 px-2 rounded-md transition duration-200">
        <button onClick={() => setIsOpen((prev) => !prev)} aria-label="Toggle menu">
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
      <div className="flex-1">
        <img src={Logo} alt="Logo" className="h-10 cursor-pointer lg:h-16 md:h-12 mt-2" />
      </div>

      {/* Desktop Menu */}
      <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-6 lg:gap-10">
        {menuItems.map((item) => (
          <Link key={item.to} to={item.to} className="font-semibold">
            {item.label}
          </Link>
        ))}
      </div>

      {/* Desktop Buttons */}
      <div className="flex-1 justify-end space-x-4 hidden lg:flex mr-4">
        {token ? (
          <div className='flex flex-row gap-4'>
          <Link to={`/my/profil/${id}/${slug}`}>
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-8 h-8 text-center pt-0.5 font-bold text-lg">A</div>
          </Link>
          <Link
            to="/deconnexion"
            className="flex items-center justify-center px-2 h-8 py-3 border border-black rounded-md text-black font-semibold hover:bg-orange-500 transition duration-200"
            onClick={logout}
          >
            <LogOut className="mr-2 w-4" />
            Se Déconnecter
          </Link>
            </div>
        ) : (
          <>
            <Link
              to="/login"
              className="flex items-center justify-center px-2 h-8 py-3 border border-black rounded-md text-black font-semibold hover:bg-orange-500 transition duration-200"
            >
              <UserCircle className="mr-2 w-4" />
              Connexion
            </Link>
            <Link
              to="/register"
              className="flex items-center justify-center h-8 px-2 py-3 border border-black rounded-md text-black font-semibold hover:bg-orange-500 transition duration-200"
            >
              <UserPlus className="mr-2 w-4" />
              S'inscrire
            </Link>
          </>
        )}
      </div>

      {/* Mobile Buttons */}
      {!token && (
        <div className="lg:hidden mr-4 flex justify-end flex-row gap-2">
          <Link
            to="/login"
            className="flex items-center justify-center px-1 h-8 py-2 border border-black rounded-md text-black hover:bg-orange-500 transition duration-200"
            aria-label="Connexion"
          >
            <UserCircle className="w-4" />
          </Link>
          <Link
            to="/register"
            className="flex justify-center items-center px-1 py-2 h-8 border border-black rounded-md text-black hover:bg-orange-500 transition duration-200"
            aria-label="S'inscrire"
          >
            <UserPlus className="w-4" />
          </Link>
        </div>
      )}

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-full bg-gray-50 shadow-md z-40"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col items-start justify-start pt-2 mb-2">
              {menuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex gap-4 font-semibold w-full py-2 px-3"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>
            <hr />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;