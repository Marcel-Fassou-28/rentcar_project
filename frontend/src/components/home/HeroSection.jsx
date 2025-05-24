import { Car } from 'lucide-react';
import Accueil from './../../assets/Vehicule/accueil.webp'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function HeroSection() {


  return (
    <div className="relative h-screen w-screen bg-cover bg-center bg-no-repeat z-20"
     style={{ backgroundImage: `url(${Accueil})` }}
     >
<motion.div
      className="z-0 absolute inset-0 text-white font-bold bg-black/40"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex flex-col items-start justify-center h-full w-full lg:h-3/4 lg:transform lg:translate-y-28 lg:ml-10 bg-black/30 lg:shadow-md lg:shadow-black p-6 md:p-8 transition-all duration-300 ease-in-out md:w-1/2 max-w-2xl mx-auto rounded-xl">
        {/* Titre et sous-titre accrocheurs */}
        <motion.div
          className="flex flex-col gap-3 mb-2 w-full lg:w-3/4 pt-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight">
            Découvrez le Maroc au volant de votre voiture de rêve !
          </h3>
          <p className="text-sm sm:text-base font-light text-gray-200">
            Lancez-vous dans une aventure inoubliable à travers les routes marocaines avec une réservation simple et rapide !
          </p>
        </motion.div>

        {/* Icône animée */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Car size="5rem" className="text-orange-500 animate-pulse mb-2" />
        </motion.div>

        {/* Nouvelle section orange */}
        <motion.div
          className="w-full h-1/2 bg-orange-500 text-white p-4 rounded-md flex flex-col items-start justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h4 className="text-lg sm:text-xl font-semibold tracking-tight">
            Prêt à explorer le Maroc avec style et liberté ?
          </h4>
          <p className="text-sm sm:text-base font-light">
            Choisissez votre voiture idéale et commencez votre voyage dès aujourd'hui avec notre service de location rapide et fiable !
          </p>
          <Link className="bg-white text-orange-500 py-2 px-4 cursor-pointer rounded-md font-semibold uppercase tracking-wide hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-orange-500 transition duration-300"
          to='/client/reserver'>
            Réserver maintenant
          </Link>
        </motion.div>
      </div>
    </motion.div>
    
    </div>
  )
}

export default HeroSection
