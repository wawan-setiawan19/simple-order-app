const router = require('express').Router()
const jwt = require('jsonwebtoken')
const db = require('../database/db')

router.post('/', (req, res) => {
  const { username, password } = req.body

  db.get(
    'SELECT * FROM users WHERE username=? AND password=?',
    [username, password],
    (err, user) => {
      if (!user) return res.status(401).json({ message: 'Login gagal' })

      const token = jwt.sign({ id: user.id }, 'SECRET_KEY')
      res.json({ token })
    }
  )
})

module.exports = router
