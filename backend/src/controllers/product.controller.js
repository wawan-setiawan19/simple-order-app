const db = require('../database/db')

exports.getAll = (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) return res.status(500).json(err)
    res.json(rows)
  })
}

exports.create = (req, res) => {
  const { name, price, stock } = req.body

  if (!name || price <= 0 || stock < 0) {
    return res.status(400).json({ message: 'Data produk tidak valid' })
  }

  db.run(
    'INSERT INTO products (name, price, stock) VALUES (?, ?, ?)',
    [name, price, stock],
    function (err) {
      if (err) return res.status(500).json(err)
      res.json({ id: this.lastID })
    }
  )
}

exports.update = (req, res) => {
  const { id } = req.params
  const { name, price, stock } = req.body

  db.run(
    'UPDATE products SET name=?, price=?, stock=? WHERE id=?',
    [name, price, stock, id],
    function (err) {
      if (err) return res.status(500).json(err)
      res.json({ updated: this.changes })
    }
  )
}

exports.remove = (req, res) => {
  const { id } = req.params
  db.run('DELETE FROM products WHERE id=?', [id], function (err) {
    if (err) return res.status(500).json(err)
    res.json({ deleted: this.changes })
  })
}
