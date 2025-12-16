const router = require('express').Router()
const db = require('../database/db')
const auth = require('../middlewares/auth.middleware')

router.post('/', auth, (req, res) => {
  const { product_id, quantity } = req.body

  // 1. Validasi basic
  if (!product_id || quantity <= 0) {
    return res.status(400).json({ message: 'Data tidak valid' })
  }

  // 2. Ambil produk
  db.get(
    'SELECT * FROM products WHERE id = ?',
    [product_id],
    (err, product) => {
      if (!product) {
        return res.status(404).json({ message: 'Produk tidak ditemukan' })
      }

      // 3. Validasi stok
      if (product.stock < quantity) {
        return res.status(400).json({
          message: 'Stok tidak mencukupi'
        })
      }

      // 4. Simpan order
      db.run(
        'INSERT INTO orders (user_id, product_id, quantity) VALUES (?,?,?)',
        [req.user.id, product_id, quantity],
        function () {
          // 5. Update stok
          db.run(
            'UPDATE products SET stock = stock - ? WHERE id = ?',
            [quantity, product_id],
            () => {
              res.json({
                message: 'Order berhasil',
                order_id: this.lastID
              })
            }
          )
        }
      )
    }
  )
})

router.get('/', auth, (req, res) => {
  db.all(
    `SELECT 
      o.id,
      p.name AS product_name,
      o.quantity,
      o.created_at
     FROM orders o
     JOIN products p ON p.id = o.product_id
     WHERE o.user_id = ?`,
    [req.user.id],
    (err, rows) => {
      res.json(rows)
    }
  )
})

module.exports = router
