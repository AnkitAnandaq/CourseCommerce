import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import { Toaster } from 'react-hot-toast'
import Courses from './components/Courses'
import Buy from './components/Buy'
import Purchases from './components/Purchases'

const App = () => {
  return (
    <div>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/courses" element={<Courses/>} />
      <Route path="/buy/:courseId" element={<Buy />} />
      <Route path="/purchases" element={<Purchases/>} />
      {/* Add more routes as needed */}
     </Routes>
     <Toaster/>
    </div>
  )
}

export default App
