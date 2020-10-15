const faker = require('faker');

// Random Title (fakerJS)
var randomTitle = () => {
  return faker.commerce.productName();
}

// Random Price (between 19.99 and 139.99)
var randomPrice = () => {
  return Math.floor(Math.random(139 - 19) + 19) + 0.99;
}

// Random Image (fakerJS, but replace with S3)
var randomImage = () => {
  return faker.image.imageURL();
}

// Similarity Rating (1-100)
var randomSimilarityRating = () => {
  return Math.floor(Math.random(100 - 1) + 1);
}

module.exports = { randomTitle, randomPrice, randomImage, randomSimilarityRating };