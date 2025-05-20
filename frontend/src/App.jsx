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
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/models' element={<Interface />} />
            <Route path='/about' element={<About />} />

            {/* Dashboard Admin */}
            <Route path='/:role/dashboard/:id/:name' element={<ProtectedRoute><DashboardClient/></ProtectedRoute>} />
            <Route path='/my/profil/:id/:name' element={<ProtectedRoute><Profil /></ProtectedRoute>} />
            <Route path='/:role/reservation' element={<ProtectedRoute><Reservations /></ProtectedRoute>} />

            {/* Dashboard Client */}
            <Route path='/client/dashboard' element={<ProtectedRoute><DashboardClient /></ProtectedRoute>} />
            <Route path='/client/mes-reservations' element={<ProtectedRoute><MesReservations /></ProtectedRoute>} />
            <Route path='/client/reserver' element={<ProtectedRoute><ReserverVoiture /></ProtectedRoute>} />
            <Route path='/client/mon-profil' element={<ProtectedRoute><ProfilClient /></ProtectedRoute>} />

            <Route path='/deconnexion' element={<ProtectedRoute><Deconnexion /></ProtectedRoute>} />
      </Routes>

    <FooterSection />
    </>
  )
}

export default App
