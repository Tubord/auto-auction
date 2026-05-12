import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Auctions from './pages/Auction'
import CarDetails from './pages/CarDetails'
import Login from './pages/Login'
import Register from './pages/Register'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}