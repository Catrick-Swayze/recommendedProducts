const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: '../../sdc.csv',
    header: [
        {id: 'id', title: 'Id'},
        {id: 'title', title: 'Title'},
        {id: 'price', title: 'Price'},
        {id: 'imageurl', title: 'ImageURL'},
        {id: 'similarityScore', title: 'Similarity Score'}
    ]
});

module.exports = { csvWriter }