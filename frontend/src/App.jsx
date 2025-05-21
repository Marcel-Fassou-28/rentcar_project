import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import FooterSection from './components/common/FooterSection'

import Contact from './components/pages/Contact'
import Interface from './components/pages/Models/interface'

import About from './components/pages/About'
import ProtectedRoute from './components/ProtectedRoute'

import Deconnexion from './components/pages/Deconnexion'
import Reservations from './components/pages/Reservations'
import ForgotPassword from './components/pages/ForgotPassword'
import ResetPassword from './components/pages/ResetPassword'
import Profil from './components/pages/User/Profil'
import DashboardContainer from './components/pages/User/DashboardContainer'

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const photo = params.get('photo');
    const error = params.get('error');

    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('photo', photo || '');
      // La redirection est gérée par l'URL :role/dashboard/:id/nom-prenom
    } else if (error) {
      navigate('/login', { state: { error: decodeURIComponent(error) } });
    }
  }, [location, navigate]);

  return (
    <>
    <Navbar />
      <Routes>
        {/* Routes Public */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/models' element={<Interface />} />
        <Route path='/about' element={<About />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />

        {/* Pour admin */}
        <Route path='/:role/reservation' element={<ProtectedRoute><Reservations /></ProtectedRoute>} />

        {/* Pour les clients */}

        {/* Pour un utilisateur connecté */}
        <Route path='/deconnexion' element={<ProtectedRoute><Deconnexion /></ProtectedRoute>} />

        {/* Routes communes */}
        <Route
          path="/:role/dashboard/:id/:name"
          element={
          <ProtectedRoute allowedRoles={['admin', 'client']}>
            <DashboardContainer />
          </ProtectedRoute> } />

      </Routes>
    <FooterSection />
    </>
  )
}

export default App
