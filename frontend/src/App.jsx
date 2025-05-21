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
import Dashboard from './components/pages/User/admin/dashboard'
import Reservations from './components/pages/User/admin/composants/Reservations'
import Clients from './components/pages/User/admin/composants/Clients'
import Voiture from './components/pages/User/admin/composants/voiture/Voiture'
import NewCar from './components/pages/User/admin/composants/voiture/NewCar'
import ModifierCar from './components/pages/User/admin/composants/voiture/ModifierCar'

function App() {

  return (
    <>
    <Navbar />
    
    <div className=''>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/models' element={<Interface />} />
        <Route path='/reservation' element={<Reservations />} />
        <Route path='/utilisateurs' element={<Clients />} />
        <Route path = '/voitures' element={<Voiture/>} />
        <Route path='/new' element={<NewCar/>} />
        <Route path='/modifyCar/:id' element={<ModifierCar />} />
        <Route path='/about' element={<About />} />
    </Routes>
    </div>
    <div>
      <FooterSection />
    </div>
    </>
  )
}

export default App
