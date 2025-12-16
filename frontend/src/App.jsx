import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Products from './pages/Products'
import Orders from './pages/Orders'
import OrderForm from './pages/OrderForm'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Products />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
