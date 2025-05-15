import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Lock, UserPlus, ArrowRight } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';

const Register = () => {
  // État pour le mot de passe et sa force
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({ level: '', score: 0 });
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  // Fonction pour évaluer la force du mot de passe
  const evaluatePasswordStrength = (pwd) => {
    let score = 0;
    if (pwd.length > 0) score += 10; // Base score pour non-vide
    if (pwd.length >= 8) score += 20; // Longueur minimale
    if (/[A-Z]/.test(pwd)) score += 20; // Majuscule
    if (/[a-z]/.test(pwd)) score += 20; // Minuscule
    if (/[0-9]/.test(pwd)) score += 20; // Chiffre
    if (/[^A-Za-z0-9]/.test(pwd)) score += 20; // Caractère spécial

    if (score <= 30) return { level: 'Faible', score: 33, color: 'bg-red-500' };
    if (score <= 70) return { level: 'Moyen', score: 66, color: 'bg-orange-500' };
    return { level: 'Fort', score: 100, color: 'bg-green-500' };
  };

  // Gestion du changement de mot de passe
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(evaluatePasswordStrength(newPassword));
    if (confirmPassword) {
      setPasswordMatchError(newPassword !== confirmPassword);
    }
  };

  // Gestion du changement de confirmation de mot de passe
  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordMatchError(password !== newConfirmPassword);
  };

  // Animation variants pour les sections
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  // Animation pour la barre de progression
  const barVariants = {
    hidden: { width: 0 },
    visible: (width) => ({
      width: `${width}%`,
      transition: { duration: 0.5, ease: 'easeOut' },
    }),
  };

  const errorVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-full flex flex-col md:flex-row bg-orange-100 pt-16 md:pt-12 lg:pt-8">
      {/* Section Image */}
      <motion.div
        className="relative w-full md:w-1/2 md:h-auto bg-cover bg-center hidden md:block"
        style={{backgroundImage: "url('https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')"}}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-6">
          <UserPlus className="w-16 h-16 mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Rejoignez l'Aventure</h1>
          <p className="text-lg md:text-xl text-center mb-6">
            Inscrivez-vous et louez la voiture parfaite pour votre prochaine destination !
          </p>
          <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-full font-semibold transition">
            Découvrir nos voitures <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Section Formulaire */}
      <motion.div
        className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <UserPlus className="w-6 h-6" /> Créer un compte
          </h2>

          <form className="space-y-4">
            {/* Nom */}
            <motion.div variants={inputVariants} initial="hidden" animate="visible">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Nom
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="lastName"
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Votre nom"
                  required
                />
              </div>
            </motion.div>

            {/* Prénom */}
            <motion.div variants={inputVariants} initial="hidden" animate="visible">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                Prénom
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="firstName"
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Votre prénom"
                  required
                />
              </div>
            </motion.div>

            {/* Email */}
            <motion.div variants={inputVariants} initial="hidden" animate="visible">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Adresse Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="votre adresse email.com"
                  required
                />
              </div>
            </motion.div>

            {/* Numéro de téléphone */}
            <motion.div variants={inputVariants} initial="hidden" animate="visible">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Numéro de téléphone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="phone"
                  type="tel"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="+33 6 12 34 56 78"
                  required
                />
              </div>
            </motion.div>

            {/* Adresse */}
            <motion.div variants={inputVariants} initial="hidden" animate="visible">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Adresse
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="address"
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="123 Rue Exemple, Ville"
                  required
                />
              </div>
            </motion.div>

            {/* Date de naissance */}
            <motion.div variants={inputVariants} initial="hidden" animate="visible">
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
                Date de naissance
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="birthDate"
                  type="date"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
            </motion.div>

            {/* Mot de passe */}
            <motion.div variants={inputVariants} initial="hidden" animate="visible">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Entrer votre mot de passe"
                  required
                />
              </div>
              {/* Barre de force du mot de passe */}
              {password && (
                <motion.div
                  className="mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${passwordStrength.color}`}
                      variants={barVariants}
                      initial="hidden"
                      animate="visible"
                      custom={passwordStrength.score}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Force du mot de passe : <span className="font-medium">{passwordStrength.level}</span>
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Confirmation du mot de passe */}
            <motion.div variants={inputVariants} initial="hidden" animate="visible">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className={`w-full pl-10 pr-4 py-2 border ${
                    passwordMatchError ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
                  placeholder="confirmer votre mot de passe"
                  required
                />
              </div>
              {passwordMatchError && (
                <motion.p
                  className="text-sm text-red-500 mt-1"
                  variants={errorVariants}
                  initial="hidden"
                  animate="visible"
                >
                  Les mots de passe ne correspondent pas
                </motion.p>
              )}
            </motion.div>

            <motion.div
              className="flex justify-end"
              variants={inputVariants}
              initial="hidden"
              animate="visible"
            >
              <button
                type="submit"
                className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition flex items-center gap-2"
                disabled={passwordMatchError || !password || !confirmPassword}
              >
                S'inscrire <UserPlus className="w-4 h-4" />
              </button>
            </motion.div>
          </form>

          <motion.div
            className="mt-6"
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
              </div>
            </div>

            <button
              className="mt-4 w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-50 transition"
            >
              <FcGoogle className="w-5 h-5" /> S'inscrire avec Google
            </button>
          </motion.div>

          <motion.p
            className="mt-6 text-center text-sm text-gray-600"
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          >
            Déjà un compte ?{' '}<a href="#" className="text-orange-500 hover:underline">Connectez-vous</a>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
