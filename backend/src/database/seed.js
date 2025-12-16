const db = require('./db')

db.run(
  "INSERT INTO users (username, password) VALUES ('admin', '123456')"
)

db.run(
  "INSERT INTO products (name, price, stock) VALUES ('Produk A', 10000, 10)"
)

db.run(
  "INSERT INTO products (name, price, stock) VALUES ('Produk B', 20000, 5)"
)

console.log('Seed selesai')
