import { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import FooterSection from './components/common/FooterSection'

import Contact from './components/pages/Contact'
import Interface from './components/pages/Models/interface'

import About from './components/pages/About'
import ProtectedRoute from './components/ProtectedRoute'

import Deconnexion from './components/pages/Deconnexion'
import Dashboard from './components/pages/User/admin/dashboard'
import Reservations from './components/pages/Reservations'
import ForgotPassword from './components/pages/ForgotPassword'
import ResetPassword from './components/pages/ResetPassword'
import Profil from './components/pages/User/Profil'

import DashboardClient from './components/pages/User/client/dashboard';
import MesReservations from './components/pages/User/client/MesReservations';
import ReserverVoiture from './components/pages/User/client/ReserverVoiture';
import ProfilClient from './components/pages/User/client/ProfilClient';

function App() {

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
        <Route path='/:role/dashboard/:id/:name' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/:role/reservation' element={<ProtectedRoute><Reservations /></ProtectedRoute>} />

        {/* Pour les clients */}


        {/* Pour un utilisateur connecté */}
        <Route path='/deconnexion' element={<ProtectedRoute><Deconnexion /></ProtectedRoute>} />
        <Route path='/my/profil/:id/:name' element={<ProtectedRoute><Profil /></ProtectedRoute>} />

        {/* Routes communes */}

      </Routes>

    <FooterSection />
    </>
  )
}

export default App
