import Accueil from './../../assets/Vehicule/accueil.webp'
import { motion, AnimatePresence } from 'framer-motion';

function HeroSection() {
  return (
    <div className="relative h-screen w-screen bg-cover bg-center bg-no-repeat -z-20"
     style={{ backgroundImage: `url(${Accueil})` }}
     >
      <motion.div 
      className="z-0 absolute inset-0  text-white font-bold bg-black/40 "
        initial={{ opacity: 0, x: -20}}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2}}
      >
        <div className='flex items-start justify-center flex-col h-full w-full lg:h-3/4 lg:transform lg:translate-y-28 lg:ml-10 bg-black/30 lg:shadow-md lg:shadow-black  p-5 md:w-1/2 transition-all duration-300 ease-in-out'>
          <div className='flex mt-8 flex-col gap-1 w-1/2 lg:w-3/4'>
            <h3 className='text-2xl w-full lg:w-1/2 sm:text-3xl'>Vous cherchez une voiture qui dépasse vos attentes ?</h3>
            <span className=' text-sm mb-5 font-light w-full'>Réservez votre voiture de location au Maroc en un clic !</span>
          </div>
          <form action="" className='flex flex-col gap-4 w-5/6 lg:w-full'>
              <div className='w-full'>
                  <select className='w-5/6 py-2 bg-orange-400/50 font-normal focus:outline-none' name="" id="">
                    <option name="" selected>--Selectionnez le lieu de départ</option>
                  </select>
              </div>
              <div className='w-full'>
                <select className='w-5/6 py-2 bg-orange-400/50 font-normal focuss:outline-none' name="" id="">
                    <option selected>--Selectionnez le lieu de retour</option>
                  </select>
              </div>
              <div className='flex flex-col gap-5'>
                <input className='py-2 px-2 capitalize font-normal text-sm' type="date" placeholder='date debut de location' />
                <input className='py-2 px-2 capitalize font-normal text-sm' type="date" placeholder='date fin de location' />
              </div>
              <button className='bg-orange-500 py-2 uppercase font-semibold rounded hover:bg-orange-600 transition duration-300' type='submit'>Chercher</button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default HeroSection
