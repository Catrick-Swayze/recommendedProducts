const { randomTitle, randomPrice, randomImage, csvWriter } = require('./seed_helpers.js');
const fs = require('fs');
const faker = require('faker');

const writeProducts = fs.createWriteStream('./postgres/csvFiles/sdc.csv');
writeProducts.write('Id, Title, Brand, Department, Price, Image URL, Product URL\n', 'utf8');

// Create arrays for brand and department
var brandArray = [];
var departmentArray = [];
for (let i = 0; i < 25; i++) {
  brandArray.push(faker.company.companyName());
  departmentArray.push(faker.commerce.department());
}

// Brand and Department helpers
var randomBrand = () => {
  var returnValue = brandArray[ Math.floor( Math.random() * brandArray.length ) ];
  var returnValueSplit = returnValue.split('');
  var commaIndex = returnValueSplit.indexOf(',');
  if (commaIndex > -1) {
    returnValueSplit.splice(commaIndex, 1);
    returnValue = returnValueSplit.join('');
  }
  return returnValue;
}
var randomDepartment = () => {
  return departmentArray[ Math.floor( Math.random() * departmentArray.length ) ];
}

let generateProductDataCSV = (writer, encoding, callback) => {
  //debugger;
  let i = 10000000;
  let id = 0;
  function write () {
    let flow = true;
    while (i > 0 && flow) {
      i -= 1;
      id += 1;
      var title = randomTitle();
      var brand = randomBrand();
      var department = randomDepartment();
      var price = randomPrice();
      var imageurl = randomImage(i);
      var producturl = `/${id % 10000000 + 1}`
      var data = `${id},${title},${brand},${department},${price},${imageurl},${producturl}\n`;
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
