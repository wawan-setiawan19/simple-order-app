import { useEffect, useState } from 'react'
import axios from '../api/axios'

export default function Orders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    axios.get('/orders').then(res => setOrders(res.data))
  }, [])

  return (
    <div className="container">
      <h2>Riwayat Pesanan</h2>

      {orders.length === 0 && (
        <p style={{ color: '#6b7280' }}>Belum ada pesanan</p>
      )}

      {orders.map(o => (
        <div className="card" key={o.id}>
          <h3>{o.product_name}</h3>
          <p>Jumlah: <strong>{o.quantity}</strong></p>
          <p style={{ fontSize: 13, color: '#6b7280' }}>
            {new Date(o.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  )
}
