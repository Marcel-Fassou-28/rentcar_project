import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Logo from './../../assets/logo-white.svg';
import { Link } from 'react-router-dom';

function FooterSection() {
  return (
    <footer className="relative bg-gray-900 text-white pt-12 pb-6 bottom-0 z-10">
      <div className="container mx-auto px-4">
        {/* Top section with logo and info */}
        <div className="flex flex-col md:flex-row justify-between mb-10">
          {/* Logo and description */}
          <div className="mb-8 md:mb-0 md:w-1/4">
            <div className="flex items-center mb-4">
              <img src={Logo} alt="Rent Car Logo" className="h-12 mr-3" />
              <span className="font-bold text-2xl text-orange-500">RENT CAR</span>
            </div>
            <p className="text-gray-400 mb-4">
              Notre mission est de fournir des véhicules de qualité à des prix compétitifs, 
              avec un service client exceptionnel pour rendre votre expérience de location 
              simple et agréable.
            </p>
          </div>

          {/* Quick links */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-semibold mb-4 text-orange-500">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-orange-500 transition duration-300">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/models" className="text-gray-400 hover:text-orange-500 transition duration-300">
                  Nos véhicules
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-orange-500 transition duration-300">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-orange-500 transition duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-semibold mb-4 text-orange-500">Nos services</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 hover:text-orange-500 transition duration-300">
                Location courte durée
              </li>
              <li className="text-gray-400 hover:text-orange-500 transition duration-300">
                Location longue durée
              </li>
              <li className="text-gray-400 hover:text-orange-500 transition duration-300">
                Location avec chauffeur
              </li>
              <li className="text-gray-400 hover:text-orange-500 transition duration-300">
                Transfert aéroport
              </li>
              <li className="text-gray-400 hover:text-orange-500 transition duration-300">
                Véhicules luxe & prestige
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-orange-500">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 text-orange-500 mr-2" />
                <span className="text-gray-400">123 Avenue Mohammed V, Casablanca, Maroc</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-orange-500 mr-2" />
                <span className="text-gray-400">+212 522 123 456</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-orange-500 mr-2" />
                <a className="text-gray-400 hover:text-orange-500 transition duration-300" href='mailto:contact@rentcar.ma'>contact@rentcar.ma</a>
              </li>
            </ul>

            {/* Social media */}
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Suivez-nous</h4>
              <div className="flex space-x-3">
                <a href="#" className="bg-gray-800 hover:bg-orange-500 p-2 rounded-full transition duration-300">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="bg-gray-800 hover:bg-orange-500 p-2 rounded-full transition duration-300">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="bg-gray-800 hover:bg-orange-500 p-2 rounded-full transition duration-300">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="bg-gray-800 hover:bg-orange-500 p-2 rounded-full transition duration-300">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} RENT CAR. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;