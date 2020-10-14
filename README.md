# recommendedProducts
Main repository for recommended products module for Truner's FEC and Chris's SDC project

On load, this repository opens some sample data for recommended products for a Target web app. When running through the included Express server and properly seeded with data, it will query a MongoDB database (created through the Mongoose ODM) for specific product departments.

To properly start up this service, run the following commands from the root directory:
- `npm install`
- `npm run seed`

The following commands should be run from their own terminals to render the app:
- `npm run build`
- `npm start`

To run the provided tests using Jest, use the following command from its own terminal:
- `npm test`

Port Number: 3003

## CRUD Operations
# GET /products/id/:productId
- Retrieves all data for productId endpoint
- Also gets data for brand/:brand, product/:productId, and price/min=:minPrice&max=:maxPrice (price), respectively

## POST /api/newProduct
- Creates a new product and inserts it into database

## DELETE /api/:product_id
- Removes product from database based on api endpoint

## PUT /api/:product_id
- Updates product brand to 'Lucky Brand'

Note: continuous integration has been implemented with CircleCI. Any pull requests to the master branch will be tested.

