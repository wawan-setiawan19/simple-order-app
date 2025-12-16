import { useEffect, useState } from 'react'
import axios from '../api/axios'

export default function OrderForm() {
  const [products, setProducts] = useState([])
  const [productId, setProductId] = useState('')
  const [quantity, setQuantity] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    axios.get('/products').then(res => setProducts(res.data))
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      await axios.post('/orders', {
        product_id: productId,
        quantity: Number(quantity)
      })
      setSuccess('Pesanan berhasil dibuat')
      setQuantity('')
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal membuat pesanan')
    }
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 480 }}>
        <h2>Pesan Produk</h2>
        <p style={{ fontSize: 14, color: '#6b7280' }}>
          Pilih produk dan jumlah yang ingin dipesan
        </p>

        {error && <div className="error">{error}</div>}
        {success && <div style={{ background: '#dcfce7', padding: 10, borderRadius: 8 }}>{success}</div>}

        <form onSubmit={submit}>
          <div className="form-group">
            <label>Produk</label>
            <select onChange={e => setProductId(e.target.value)}>
              <option value="">Pilih produk</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} (stok: {p.stock})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Jumlah</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
            />
          </div>

          <button>Pesan Sekarang</button>
        </form>
      </div>
    </div>
  )
}
