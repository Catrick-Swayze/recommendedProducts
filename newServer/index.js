const nr = require('newrelic');
const express = require('express');
const path = require('path');
require('dotenv').config()
const client = require('../postgres/index.js');
const app = express();

// Middleware
// app.use(express.json()); // req.body (might not need yet because may just need to use req.params)
app.use(express.static(path.join(__dirname, '..', 'dist')));

// Routers
app.get('/', (req, res) => {
  console.log('Successful get at root!');
  res.end();
})

app.get('/products/id/:product_id', async(req, res) => {
  const { product_id } =  req.params;
  try {
    const product = await client.query('SELECT * FROM products WHERE id=$1', [`${product_id}`])
    await console.log(`Successful get at ${product_id}`);
    res.send(product.rows);
  } catch(err) {
    console.error(err.message)
  }
})

// Open Port
app.listen(process.env.NODE_PORT, () => {
  console.log('Listening on port', process.env.NODE_PORT)
})