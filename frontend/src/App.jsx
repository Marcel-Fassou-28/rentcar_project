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
import Dashboard from './components/pages/User/admin/dashboard'

import Clients from './components/pages/User/admin/composants/Clients'
import Voiture from './components/pages/User/admin/composants/voiture/Voiture'
import NewCar from './components/pages/User/admin/composants/voiture/NewCar'
import ModifierCar from './components/pages/User/admin/composants/voiture/ModifierCar'
import DeleteCar from './components/pages/User/admin/composants/voiture/DeleteCar'

import Reservations from './components/pages/User/admin/composants/Reservations/Reservations'



//import Reservations from './components/pages/Reservations'
import ForgotPassword from './components/pages/ForgotPassword'
import ResetPassword from './components/pages/ResetPassword'
import Profil from './components/pages/User/Profil'
import DashboardContainer from './components/pages/User/DashboardContainer'
import DashboardClient from './components/pages/User/client/dashboard'
import MesReservations from './components/pages/User/client/MesReservations'
import ReserverVoiture from './components/pages/User/client/ReserverVoiture'
import ProfilClient from './components/pages/User/client/ProfilClient'
import { GoogleOAuthProvider } from '@react-oauth/google'


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
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        
        <Route path='/:role/reservation' element={<ProtectedRoute allowedRoles={'client'}><MesReservations /></ProtectedRoute>} />
        <Route path='/:role/reserver' element={<ProtectedRoute allowedRoles={'client'}><ReserverVoiture /></ProtectedRoute>} />
        <Route path='/:role/my/profil/:id' element={<ProtectedRoute><ProfilClient /></ProtectedRoute>} />

        {/* Routes admin (à adapter si nécessaire) */}
        
        <Route path='/:role/dashboard/:id/:name' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/:role/reservation' element={<ProtectedRoute><Reservations /></ProtectedRoute>} />
        <Route path='/:role/utilisateurs' element={<ProtectedRoute><Clients /></ProtectedRoute>} />
        <Route path='/:role/voitures' element={<ProtectedRoute><Voiture /></ProtectedRoute>} />
        <Route path='/:role/voitures/new' element={<ProtectedRoute><NewCar /></ProtectedRoute>} />
        <Route path='/:role/voitures/modifyCar/:id' element={<ProtectedRoute><ModifierCar /></ProtectedRoute>} />
        <Route path='/:role/voitures/delete/:id' element={<ProtectedRoute><DeleteCar /></ProtectedRoute>} />


        
        {/* Routes client sécurisées */}
        <Route path='/client/dashboard' element={<ProtectedRoute><DashboardClient /></ProtectedRoute>} />
        <Route path='/client/mes-reservations' element={<ProtectedRoute><MesReservations /></ProtectedRoute>} />
        <Route path='/client/reserver' element={<ProtectedRoute><ReserverVoiture /></ProtectedRoute>} />
        <Route path='/client/mon-profil' element={<ProtectedRoute><ProfilClient /></ProtectedRoute>} />

        {/* Routes communes */}
        <Route
          path="/:role/dashboard/:id/:name"
          element={
          <ProtectedRoute allowedRoles={['admin', 'client']}>
            <DashboardContainer />
          </ProtectedRoute> } />

        <Route path='/:role/models' element={<ProtectedRoute allowedRoles={['client', 'admin']}><Interface /></ProtectedRoute>} />
        <Route path='/deconnexion' element={<ProtectedRoute><Deconnexion /></ProtectedRoute>} />

      </Routes>
    <FooterSection />
    </>
  )
}

export default App
