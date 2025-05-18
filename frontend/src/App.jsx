import { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import FooterSection from './components/common/FooterSection'
import Model from './components/pages/Model'
import Contact from './components/pages/Contact'
import Interface from './components/pages/Models/interface'

import About from './components/pages/About'

function App() {

  return (
    <>
    <Navbar />
    
    <div className=''>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/model-voiture' element={<Model />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/models' element={<Interface />} />
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
