const nr = require('newrelic');
const express = require('express');
const path = require('path');
require('dotenv').config()
const client = require('../postgres/index.js');
const app = express();
const axios = require('axios');

// Middleware
// app.use(express.json()); // req.body (might not need yet because may just need to use req.params)
app.use(express.static(path.join(__dirname, '..', 'dist')));

// Routers
app.get('/', (req, res) => {
  console.log('Successful get at root!');
  // res.end(); // Not in Turner's API design
})

// app.get('/products/dept/:dept', (req, res) => {
//   let formattedDept = formatName(req.params.dept);
//   RecommendedItem.find({ department: formattedDept }, (err, results) => {
//     res.json(results);
//   });
// });

// app.get('/products/brand/:brandName', (req, res) => {
//   // escape certain characters from request url
//   let brandWords = req.params.brandName.split(/[,.\s-&amp]/);
//   RecommendedItem.find({
//     brand: {$regex: `^${brandWords.join('.*\s*')}$`, $options: 'i'}}, (err, results) => {
//     res.json(results);
//   });
// });

// app.get('/products/price/min=:minPrice&max=:maxPrice', (req, res) => {
//   RecommendedItem.find({
//     price: {
//       $gte: req.params.minPrice || 0,
//       $lte: req.params.maxPrice || 1000 }
//     }, (err, results) => {
//       res.json(results);
//     }
//   );
// });

// app.get('/products/id/:productId', async (req, res) => {
//   RecommendedItem.findOne({ id: parseInt(req.params.productId) }, async (err, searchedProduct) => {
//     let deptMatch = await axios.get(`http://localhost:3003/products/dept/${searchedProduct.department}`);
//     let brandMatch = await axios.get(`http://localhost:3003/products/brand/${searchedProduct.brand}`);
//     let priceMatch = await axios.get(`http://localhost:3003/products/price/min=${searchedProduct.price * 0.9}&max=${searchedProduct.price * 1.1}}`);

//     const allResults = deptMatch.data.concat(brandMatch.data).concat(priceMatch.data);

//     res.send(allResults);
//   });

// });

/************* Formatting Helper Function *************/
const formatName = (string) => {
  return string[0].toUpperCase() + string.split('').slice(1).join('');
};
/************* Formatting Helper Function *************/

// My functioning postgres test query
app.get('/products/id/:product_id', async(req, res) => {
  const { product_id } =  req.params;
  try {
    const product = await client.query('SELECT * FROM products WHERE id<$1', [`25`])
    //await console.log(`Successful get at ${product_id}`);
    res.send(product.rows);
  } catch(err) {
    console.error(err.message)
  }
})

app.post('/newProduct', async(req, res) => {
  // Receive the data
  try {
    await client.query("BEGIN");
    await client.query("insert into products values ($1, $2, $3, $4, $5, $6, $7)", [10000010, 'Sample Title', 'Sample Brand', 'SampleBrand', 120.99, 'https://sdctestbucket.s3.amazonaws.com/tarjay-sample-1.jpeg', '/123abc']);
    console.log('Inserted new row');
    await client.query('COMMIT');
    res.send('Success!');
  } catch (ex) {
    console.log(`Failed to execute: ${ex}`);
  }
  //const { product_id } =  req.params; // can we auto assign the id?
  // Add a finally encapsulation?
})

// Open Port
app.listen(process.env.NODE_PORT, () => {
  console.log('Listening on port', process.env.NODE_PORT)
})