// This is where we run the script that generates the fake entry and enters it into the database
const { randomTitle, randomPrice, randomImage, randomSimilarityRating } = require('./seed_helpers.js');
const { csvWriter } = require('./csvWriter.js');

let count = 1;
let newProducts = [];

let generateCSV = () => {
  // Creating 100k Records
  while (count <= 100000) {
    debugger;
    let newProduct = {
      id: count,
      title: randomTitle(),
      price: randomPrice(),
      imageurl: randomImage(),
      similarityScore: randomSimilarityRating()
    }
    newProducts.push(newProduct);
    newProduct = {};
    count++;
  }

  csvWriter.writeRecords(newProducts)       // returns a promise
    .then(() => {
      console.log('...Done');
    })
    .catch((err) => {
      console.log('There was an error!', err);
    });
}

generateCSV();