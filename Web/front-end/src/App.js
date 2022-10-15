import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ProtectedRoute from './compoments/ProtectedRoute'
import { AuthProvider } from './compoments/Auth'
import Register from './pages/Register'
import User from './pages/User'
import Contact from './pages/Contact'

export default function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/" element={<Navigate replace to="/user" />} />
          <Route path="/user" element={<User />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/register" element={<Register />} />
          <Route path={'/'} element={<ProtectedRoute ><Home /></ProtectedRoute>} >
          </Route> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}