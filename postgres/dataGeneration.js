const { randomTitle, randomPrice, randomImage, randomSimilarityRating, csvWriter } = require('./seed_helpers.js');
const fs = require('fs');

const writeProducts = fs.createWriteStream('./postgres/csvFiles/sdc.csv');
writeProducts.write('Id, Title, Price, Image URL, Similarity Score\n', 'utf8');

let generateProductDataCSV = (writer, encoding, callback) => {
  debugger;
  let i = 5000;
  let id = 0;
  function write () {
    let flow = true;
    while (i > 0 && flow) {
      i -= 1;
      id += 1;
      var title = randomTitle();
      var price = randomPrice();
      var imageurl = randomImage(i);
      var similarityScore = randomSimilarityRating();
      var data = `${id}, ${title}, ${price}, ${imageurl}, ${similarityScore}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback)
      } else {
        flow = writer.write(data, encoding);
      }
    }
    if (i > 0) {
      writer.once('drain', write)
    }
  }
  write();
}

generateProductDataCSV(writeProducts, 'utf-8', () => {
  console.log('Donions');
  writeProducts.end()
});

module.exports = { generateProductDataCSV }