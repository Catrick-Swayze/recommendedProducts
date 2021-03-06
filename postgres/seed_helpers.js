const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Random Title (fakerJS)
var randomTitle = () => {
  return faker.commerce.productName();
}

// Random Price (between 19.99 and 139.99)
var randomPrice = () => {
  return parseFloat((Math.floor(Math.random() * 139) + 19.99).toFixed(2)); // toFixed keeps 2 decimal points, and Parse.float converts back to a float
}

// Random Image (fakerJS, but replace with S3)
var randomImage = (int) => {
  // return `https://twzkraus-fec-images.s3-us-west-1.amazonaws.com/target-images/${int % 50}.jpg`;
  return 'https://sdctestbucket.s3.amazonaws.com/tarjay-sample-1.jpeg';
}

const csvWriter = createCsvWriter({
    path: './postgres/csvFiles/sdc.csv',
    header: [
        {id: 'id', title: 'Id'},
        {id: 'title', title: 'Title'},
        {id: 'brand', title: 'Brand'},
        {id: 'department', title: 'Department'},
        {id: 'price', title: 'Price'},
        {id: 'imageurl', title: 'ImageURL'},
        {id: 'producturl', title: 'ProductURL'}
    ]
});


// Similarity Rating (1-100)
// var randomSimilarityRating = () => {
//   return Math.floor(Math.random() * 100 + 1);
// }

module.exports = { randomTitle, randomPrice, randomImage, csvWriter };