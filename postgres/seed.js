const { randomTitle, randomPrice, randomImage, randomSimilarityRating, csvWriter } = require('./seed_helpers.js');

let count = 1;
let newProducts = [];

let generateCSV = () => {
  // Creating 1M Records
  // TODO: Increase to 10M when ready
  while (count <= 100) {
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