const nr = require('newrelic');
const express = require('express');
const path = require('path');
const PORT = 3030;
require('dotenv').config()

const app = express();

// Middleware
// app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'dist')));

// Routers
app.get('/', (req, res) => {
  console.log('Successful get at root!');
  res.end();
})

app.get('/products/id/:product_id', (req, res) => {
  console.log(`Successful get at ${req.params.product_id}`);
  res.send([]);
})

// Open Port
app.listen(PORT, () => {
  console.log('Listening on port', PORT)
})