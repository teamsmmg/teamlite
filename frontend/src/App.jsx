import React from 'react'
import {Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Product from './pages/Product'



const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Navbar/>
      <Routes>
<Route path='/' element={<Product/>} />


      </Routes>
    </div>
  )
}

export default App

