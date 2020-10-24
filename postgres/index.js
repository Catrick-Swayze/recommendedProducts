// This is where we make the connection to postgres database
const { Client } = require('pg')
require('dotenv').config()

const client = new Client({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE
})

client.connect()
  .then(() => console.log('Connected to Postgres successfully!'))
//   .then((result) => console.table(result.rows))
//   .catch((e) => console.error(e))
//   .finally(() => client.end())

  module.exports = client;