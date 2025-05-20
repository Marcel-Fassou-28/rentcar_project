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
import Dashboard from './components/pages/dashboard/dashboard'
import Deconnexion from './components/pages/Deconnexion'

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
        <Route path='/dashboard/:id/:name' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/deconnexion' element={<ProtectedRoute><Deconnexion /></ProtectedRoute>} />
        
      </Routes>
    <FooterSection />
    </>
  )
}

export default App
