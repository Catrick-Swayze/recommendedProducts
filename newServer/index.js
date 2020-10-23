const nr = require('newrelic');
const express = require('express');
const PORT = 3030;

const app = express();

// Middleware
app.use(express.static('./../dist'));

// Routers


// Open Port
app.listen(PORT, () => {
  console.log('Listening on port', PORT)
})