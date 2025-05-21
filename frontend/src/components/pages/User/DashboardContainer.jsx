import { Navigate, useParams } from 'react-router-dom';
import ProtectedRoute from '../../ProtectedRoute';
import Dashboard from './admin/dashboard';
import DashboardClient from './client/dashboard';

// Composant DashboardContainer pour gérer la logique du rôle
const DashboardContainer = () => {
  const { role } = useParams(); // Récupère le paramètre :role de l'URL
  const user = localStorage.getItem('user');
  let userRole = null;

  try {
    const parsedUser = user ? JSON.parse(user) : null;
    userRole = parsedUser?.role || null;
  } catch (error) {
    console.error('Erreur lors de l\'analyse des données utilisateur :', error);
  }

  // Vérifie si le rôle dans l'URL correspond au rôle de l'utilisateur
  if (role !== userRole) {
    return <Navigate to="/" replace state={{ error: 'accès non autorisé pour cette page' }} />;
  }

  // Affiche le composant approprié en fonction du rôle
  if (userRole === 'admin') {
    return <Dashboard />;
  } else if (userRole === 'client') {
    return <DashboardClient />;
  } else {
    return <Navigate to="/" replace state={{ error: 'Accès non autorisé' }} />;
  }
};

export default DashboardContainer
