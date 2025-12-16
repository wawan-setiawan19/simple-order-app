const express = require('express')
const cors = require('cors')

require('./database/db') // <-- penting

const app = express()
app.use(cors())
app.use(express.json())

app.use('/login', require('./routes/auth.routes'))
app.use('/products', require('./routes/product.routes'))
app.use('/orders', require('./routes/order.routes'))

module.exports = app
