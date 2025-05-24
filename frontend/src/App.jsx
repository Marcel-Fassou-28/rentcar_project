import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

{/* Public components */}
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import FooterSection from './components/common/FooterSection'
import ForgotPassword from './components/pages/ForgotPassword'
import ResetPassword from './components/pages/ResetPassword'
import Contact from './components/pages/Contact'
import Interface from './components/pages/Models/interface'
import About from './components/pages/About'

{/* ROutes pour administrateurs */}

import Clients from './components/pages/User/admin/composants/Clients'
import Voiture from './components/pages/User/admin/composants/voiture/Voiture'
import NewCar from './components/pages/User/admin/composants/voiture/NewCar'
import ModifierCar from './components/pages/User/admin/composants/voiture/ModifierCar'
import DeleteCar from './components/pages/User/admin/composants/voiture/DeleteCar'

{/* Routes Pour clients */}
import MesReservations from './components/pages/User/client/MesReservations'
import ReserverVoiture from './components/pages/User/client/ReserverVoiture'
import Setting from './components/pages/User/client/Settings'

{/* Portected Routes */}
import Deconnexion from './components/pages/Deconnexion'
import DashboardContainer from './components/pages/User/DashboardContainer'
import Profil from './components/pages/User/Profil'
import Reservations from './components/pages/User/admin/composants/Reservations/Reservations'




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
        
        {/* Pour l'admin */}
         <Route path = '/admin/voitures' element={<ProtectedRoute allowedRoles={'admin'}><Voiture/></ProtectedRoute>} />
        <Route path='/admin/voitures/new' element={<ProtectedRoute allowedRoles={'admin'}><NewCar/></ProtectedRoute>} />
        <Route path='/admin/voiture/update/:id' element={<ProtectedRoute allowedRoles={'admin'}><ModifierCar /></ProtectedRoute>} /> 
        <Route path='/:role/voitures/modifyCar/:id' element={<ProtectedRoute allowedRoles={'admin'}><ModifierCar /></ProtectedRoute>} />
        <Route path='/:role/voitures/delete/:id' element={<ProtectedRoute allowedRoles={'admin'}><DeleteCar /></ProtectedRoute>} />
        
        <Route path='/admin/utilisateurs' element={<ProtectedRoute allowedRoles={'admin'}><Clients /></ProtectedRoute>} />
        <Route path='/admin/reservation' element={<ProtectedRoute allowedRoles={'admin'}><Reservations /></ProtectedRoute>} />


        {/* Routes client sécurisées */}
        <Route path='/client/reservation' element={<ProtectedRoute allowedRoles={'client'}><MesReservations /></ProtectedRoute>} />
        <Route path='/client/reserver' element={<ProtectedRoute allowedRoles={'client'}><ReserverVoiture /></ProtectedRoute>} />
        <Route path='/client/settings/:id' element={<ProtectedRoute allowedRoles={'client'}><Setting /></ProtectedRoute>} />

        {/* Routes communes */}
        <Route
          path="/:role/dashboard/:id/:name"
          element={
          <ProtectedRoute allowedRoles={['admin', 'client']}>
            <DashboardContainer />
          </ProtectedRoute> } />
        <Route path='/:role/my/profil/:id' element={<ProtectedRoute allowedRoles={['client', 'admin']}><Profil /></ProtectedRoute>} />
        <Route path='/:role/models' element={<ProtectedRoute allowedRoles={['client', 'admin']}><Interface /></ProtectedRoute>} />
        <Route path='/deconnexion' element={<ProtectedRoute allowedRoles={['client', 'admin']}><Deconnexion /></ProtectedRoute>} />

      </Routes>
    <FooterSection />
    </>
  )
}

export default App
