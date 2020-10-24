// This is where we make the connection to postgres database
// Update: Won't be connecting to db from here

// Connecting to Postgres using PG
const { Client } = require('pg')
require('dotenv').config()
// const pool = new Pool({
//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT,
// })
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })
const client = new Client({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE
})
client.connect()
  .then(() => console.log('Connected to Postgres successfully!'))
  .then(() => client.query('SELECT * FROM products WHERE id=1'))
  .then((result) => console.table(result.rows))
  .catch((e) => console.error(e))
  .finally(() => client.end())

// client.query('SELECT * FROM products WHERE id=1', (err, res) => {
//   console.log(err, res)
//   client.end()
// })

