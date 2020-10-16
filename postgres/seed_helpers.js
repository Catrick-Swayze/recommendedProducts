const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Random Title (fakerJS)
var randomTitle = () => {
  return faker.commerce.productName();
}

// Random Price (between 19.99 and 139.99)
var randomPrice = () => {
  return Math.floor(Math.random() * 139) + 19.99;
}

// Random Image (fakerJS, but replace with S3)
var randomImage = () => {
  return faker.image.imageUrl();
}

// Similarity Rating (1-100)
var randomSimilarityRating = () => {
  return Math.floor(Math.random() * 100 + 1);
}

const csvWriter = createCsvWriter({
    path: './postgres/csvFiles/sdc.csv',
    header: [
        {id: 'id', title: 'Id'},
        {id: 'title', title: 'Title'},
        {id: 'price', title: 'Price'},
        {id: 'imageurl', title: 'ImageURL'},
        {id: 'similarityScore', title: 'Similarity Score'}
    ]
});

module.exports = { randomTitle, randomPrice, randomImage, randomSimilarityRating, csvWriter };