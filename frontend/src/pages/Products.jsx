import { useEffect, useState } from 'react'
import axios from '../api/axios'

export default function Products() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ name: '', price: '', stock: '' })
  const [editId, setEditId] = useState(null)

  const load = () => {
    axios.get('/products').then(res => setProducts(res.data))
  }

  useEffect(load, [])

  const submit = async (e) => {
    e.preventDefault()

    if (editId) {
      await axios.put(`/products/${editId}`, form)
    } else {
      await axios.post('/products', form)
    }

    setForm({ name: '', price: '', stock: '' })
    setEditId(null)
    load()
  }

  const edit = (p) => {
    setEditId(p.id)
    setForm(p)
  }

  const remove = async (id) => {
    if (!confirm('Hapus produk?')) return
    await axios.delete(`/products/${id}`)
    load()
  }

  return (
    <div className="container">
      <h2>Manajemen Produk</h2>

      <div className="card" style={{ maxWidth: 480 }}>
        <h3>{editId ? 'Edit Produk' : 'Tambah Produk'}</h3>

        <form onSubmit={submit}>
          <input placeholder="Nama" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })} />

          <input placeholder="Harga" type="number" value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })} />

          <input placeholder="Stok" type="number" value={form.stock}
            onChange={e => setForm({ ...form, stock: e.target.value })} />

          <button>{editId ? 'Update' : 'Simpan'}</button>
        </form>
      </div>

      <div style={{ marginTop: 24 }}>
        {products.map(p => (
          <div className="card" key={p.id}>
            <h3>{p.name}</h3>
            <p>Harga: Rp {p.price}</p>
            <p>Stok: {p.stock}</p>

            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => edit(p)}>Edit</button>
              <button className="secondary" onClick={() => remove(p.id)}>Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
