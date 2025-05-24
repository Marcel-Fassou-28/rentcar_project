import FooterSection from "../common/FooterSection"
import Description from "../common/Description"
import DescriptionPicture from "./../../assets/Vehicule/description.webp"
import { motion } from "framer-motion"

function About() {
  return (
    <div className="overflow-x-hidden bg-gray-50">
      {/* Hero Section */}
<div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 px-8 md:px-16 pt-24">
        <div className="max-w-6xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-orange-500">À PROPOS</span> DE RENT CAR
          </motion.h1>
          <motion.div 
            className="w-24 h-1 bg-orange-500 mb-8"
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <motion.p 
            className="text-xl font-light leading-relaxed max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Chez <span className="font-semibold">Rent Car</span>, nous transformons la location de véhicules en une expérience exceptionnelle. 
            Notre engagement est de vous offrir un service premium, rapide et flexible pour tous vos besoins de mobilité.
          </motion.p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="py-16 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Notre Histoire */}
          <div className="mb-16">
            <motion.h2 
              className="text-3xl font-semibold mb-6 text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Notre Vision
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-700 leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Grâce à notre flotte diversifiée de véhicules récents et parfaitement entretenus, nous proposons des solutions de mobilité sur mesure pour tous les profils : particuliers en quête d'évasion, professionnels exigeants ou touristes désireux de découvrir la région en toute liberté. Notre équipe passionnée vous accompagne à chaque étape pour garantir une expérience de conduite exceptionnelle.
            </motion.p>
          </div>

          {/* Image et Valeurs */}
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <img 
                src={DescriptionPicture} 
                alt="La flotte Rent Car" 
                className="rounded-xl shadow-xl w-full h-auto object-cover" 
              />
            </motion.div>

            <div className="lg:w-1/2 space-y-8">
              <motion.h2 
                className="text-3xl font-semibold mb-6 text-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Nos Valeurs
              </motion.h2>

              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}
              >
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-orange-500 mb-2">Excellence & Qualité</h3>
                  <p className="text-gray-700">
                    Une sélection rigoureuse de véhicules premium et récents, entretenus selon les plus hauts standards pour garantir votre confort et votre sécurité sur toutes les routes.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-orange-500 mb-2">Flexibilité & Personnalisation</h3>
                  <p className="text-gray-700">
                    Des formules adaptées à chaque besoin - de la location courte durée aux solutions longue durée avec services sur mesure pour particuliers et professionnels.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-orange-500 mb-2">Service Client Premium</h3>
                  <p className="text-gray-700">
                    Une équipe disponible 24/7, formée pour anticiper vos besoins et vous offrir une assistance personnalisée à chaque étape de votre expérience avec Rent Car.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-orange-500 text-white py-12 px-8 md:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à prendre la route avec nous ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Découvrez notre flotte et réservez votre véhicule idéal en quelques clics.
          </p>
          <button className="bg-white text-orange-500 font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg">
            Réserver maintenant
          </button>
        </div>
      </div>
    </div>
  )
}

export default About
