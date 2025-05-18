import { useState } from 'react'
import { UserPlus, UserCircle, Menu, X, Home, CarFront, Info, Contact } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './../assets/Logo.svg'
import { Link } from 'react-router-dom'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed w-full py-4 bg-white flex flex-row justify-between items-center shadow-sm h-16 z-10">
      {/* Hamburger (mobile/tablette) */}
      <div className="md:hidden hover:bg-orange-500 pt-1 ml-2 px-2 rounded-md transition duration-300">
        <button onClick={() => setIsOpen(!isOpen)}>
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
        <img src={Logo} alt="logo" className="h-10 cursor-pointer lg:h-16 md:h-12 mt-2" />
      </div>

      {/* Menu desktop */}
      <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-6 gap-8 lg:gap-10">
        <li className="list-none">
          <Link to="/" className="font-semibold">Home</Link>
        </li>
        <li className='list-none'>
            <Link to='/model-voiture' className='font-semibold'>Models</Link>
        </li>
        <li className='list-none'>
            <Link to='/contact' className='font-semibold'>Contact</Link>
        </li>
        <li className='list-none'>
            <Link to='about' className='font-semibold'>About</Link>
            <a href="/models" className='font-semibold'>Models</a>
            {/* <Link to='/models' className='font-semibold'>Models</Link> */}
        </li>
        <li className="list-none">
          <Link to="/contact" className="font-semibold">Contact</Link>
        </li>
        <li className="list-none">
          <Link to="/about" className="font-semibold">About</Link>
        </li>
      </div>

      {/* Boutons desktop */}
      <div className="flex-1 justify-end space-x-4 hidden lg:flex mr-4">
        <Link to="/login" className="flex items-center justify-center px-2 h-8 py-3 border border-black rounded-md text-black font-semibold hover:bg-orange-500 transition duration-200">
          <UserCircle className="mr-2 w-4" />
          Connexion
        </Link>
        <Link to="/register" className="flex items-center justify-center h-8 px-2 py-3 border border-black rounded-md text-black font-semibold hover:bg-orange-500 transition duration-200">
          <UserPlus className="mr-2 w-4" />
          S'inscrire
        </Link>
      </div>

      {/* Boutons mobile */}
      <div className="lg:hidden mr-4 flex justify-end flex-row gap-2">
        <Link to="/login" className="flex items-center justify-center px-1 h-8 py-2 border border-black rounded-md text-black hover:bg-orange-500 transition duration-200">
          <UserCircle className="mr-2 w-4" />
        </Link>
        <Link to="/register" className="flex justify-center items-center px-1 py-2 h-8 border border-black rounded-md text-black hover:bg-orange-500 transition duration-200">
          <UserPlus className="mr-2 w-4" />
        </Link>
      </div>

      {/* Menu mobile déroulant */}
      {isOpen && (
        <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-full bg-gray-50 shadow-md z-40 transition-transform duration-300">
          <div className="flex flex-col items-start justify-start pt-2 mb-2">
            <Link to="/" className="flex gap-4 font-semibold w-full py-2 px-3"><Home size={20} />Home</Link>
            <Link to="/models" className="flex gap-4 font-semibold w-full py-2 px-3"><CarFront size={20} />Models</Link>
            <Link to="/contact" className="flex gap-4 font-semibold w-full py-2 px-3"><Contact size={20} />Contact</Link>
            <Link to="/about" className="flex gap-4 font-semibold w-full py-2 px-3"><Info size={20} />About</Link>
          </div>
          <hr />
        </div>
      )}
    </nav>
  )
}

export default Navbar
