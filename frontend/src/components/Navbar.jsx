import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  if (!token) return null

  return (
    <div style={{
      background: '#111827',
      padding: '12px'
    }}>
      <div className="container navbar">
        <div className='links'>
            <a href="/" style={{ color: '#fff' }}>Produk</a>
            <a href="/order" style={{ color: '#fff' }}>Pesan</a>
            <a href="/orders" style={{ color: '#fff' }}>Riwayat</a>
        </div>
        <button className='logout' onClick={logout}>Logout</button>
      </div>
    </div>
  )
}
