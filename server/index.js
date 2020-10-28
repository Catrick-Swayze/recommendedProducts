const nr = require('newrelic');
const express = require('express');
const RecommendedItem = require('../database/RecommendedItem.js');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
const faker = require('faker');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('/', (req, res) => {
  console.log('GOT a GET');
});

app.get('/products/dept/:dept', (req, res) => {
  let formattedDept = formatName(req.params.dept);
  RecommendedItem.find({ department: formattedDept }, (err, results) => {
    res.json(results);
  });
});

app.get('/products/brand/:brandName', (req, res) => {
  // escape certain characters from request url
  let brandWords = req.params.brandName.split(/[,.\s-&amp]/);
  RecommendedItem.find({
    brand: {$regex: `^${brandWords.join('.*\s*')}$`, $options: 'i'}}, (err, results) => {
    res.json(results);
  });
});

app.get('/products/price/min=:minPrice&max=:maxPrice', (req, res) => {
  RecommendedItem.find({
    price: {
      $gte: req.params.minPrice || 0,
      $lte: req.params.maxPrice || 1000 }
    }, (err, results) => {
      res.json(results);
    }
  );
});

app.get('/products/id/:productId', async (req, res) => {
  RecommendedItem.findOne({ id: parseInt(req.params.productId) }, async (err, searchedProduct) => {
    let deptMatch = await axios.get(`http://localhost:3003/products/dept/${searchedProduct.department}`);
    let brandMatch = await axios.get(`http://localhost:3003/products/brand/${searchedProduct.brand}`);
    let priceMatch = await axios.get(`http://localhost:3003/products/price/min=${searchedProduct.price * 0.9}&max=${searchedProduct.price * 1.1}}`);

    const allResults = deptMatch.data.concat(brandMatch.data).concat(priceMatch.data);

    res.send(allResults);
  });

});

// Create Operations
app.post('/api/newProduct', (req, res) => {
  let newProductID = 21;
  // Create new fake record
  let newRecord = {
    id: `${newProductID}`,
    title: faker.commerce.productName(),
    brand: 'Collins and Sons',
    department: 'Outdoors',
    price: Number(faker.commerce.price(0, 100)) - Math.ceil(Math.random() * 5) / 100,
    imageUrl: `https://twzkraus-fec-images.s3-us-west-1.amazonaws.com/target-images/${newProductID}.jpg`,
    productUrl: `/${newProductID}`//`/${i % 100 + 1}`
  }

  // Insert to db via Mongoose
  RecommendedItem.create(newRecord, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
})

app.delete('/api/:product_id', async (req, res) => {
  let product_id = req.params.product_id;
  const deleteProduct = await RecommendedItem.deleteOne({id: product_id}, (err) => {
    if (err) console.log(err);
    console.log('Successful deletion!');
  })
  console.log('Deleted product: ', deleteProduct);
  res.end();
})

app.put('/api/:product_id/', async (req, res) => {
  let product_id = req.params.product_id;
  let newBrand = 'Lucky Brand';
  let updatedBrand = {brand: newBrand};

  const updatedProduct = await RecommendedItem.findOneAndUpdate({id: product_id}, updatedBrand, (err) => {
    if (err) console.log(err);
    console.log('Successful update!');
  });
  res.end();
})

const formatName = (string) => {
  return string[0].toUpperCase() + string.split('').slice(1).join('');
};

module.exports = app;
