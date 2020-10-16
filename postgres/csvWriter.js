const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: './postgres/out.csv',
    header: [
        {id: 'id', title: 'Id'},
        {id: 'title', title: 'Title'},
        {id: 'price', title: 'Price'},
        {id: 'imageurl', title: 'ImageURL'},
        {id: 'similarityScore', title: 'Similarity Score'}
    ]
});

const records = [
  {
    id: 'Bob',
    title: 'Sample Product',
    price: 49.99,
    imageurl: 'www.google.com',
    similarityScore: 10
  }
];

csvWriter.writeRecords(records)       // returns a promise
  .then(() => {
    console.log('...Done');
  })
  .catch((err) => {
    console.log('There was an error!', err);
  });