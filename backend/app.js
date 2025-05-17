const express = require('express');
const app = express();
const host = "localhost"; 
const port = 3000;
const uuid = require('short-uuid');
const cors = require('cors');
const pgPersistence = require('./lib/pg-persistence.js');
const sqlClient = new pgPersistence();
const MongoPersistence = require('./lib/mongo-persistence.js');
const mongoClient = new MongoPersistence();

app.use(cors());
app.use(express.json())

function generateBasketURL() {
  const basketUrl = uuid.generate();
  return basketUrl;
}

async function handleRequest(req) {
  // Create MongoDB document for request 
  const {body, method, headers, query, path} = req;
  console.log('params', query)
  const ID = generateBasketURL();
  const mongoId = await mongoClient.createRequest({body, method, headers, queryParams: query, path, ID});
  // Create SQL row for request
  const request = await sqlClient.createRequest(req, mongoId);
  return request;
}
// Handle web hook get requests
app.get('/:requestURL', async (req, res) => {
  const request = await handleRequest(req);
  res.json({request});
})

// Handle web hook post request
app.post('/:requestURL', async (req, res) => {
  const request = await handleRequest(req);
  res.json({request});
})

// Create new basket
app.post('/baskets/new', async (req, res) => {
  const basketURL = generateBasketURL();
  await sqlClient.createBasket(basketURL);
  const newBasket = await sqlClient.getBasketByUrl(basketURL);
  res.json({newBasket});
})

// View all baskets
app.get('/baskets/all', async (req, res) => {
  const baskets = await sqlClient.getAllBaskets();
  res.json({baskets: baskets});
})

// View an existing basket
app.get('/baskets/:basketURL', async (req, res) => {
  // Find the basket from the SQL database 
  const basketURL = req.params.basketURL;
  const basket = await sqlClient.getBasketByUrl(basketURL);
  const requests = await sqlClient.getAllRequestsFromBasket(basket.id);
  
  for (let request of requests) {
    const mongoRequest = await mongoClient.getRequest(request.mongo_id);
    request.body = mongoRequest.body;
    request.headers = mongoRequest.headers;
    request.path = mongoRequest.path;
    request.queryParams = mongoRequest.queryParams;
  }
  res.json({basket, requests: requests});
})

app.get('/', async (req, res) => {
  res.json({error: 'not a valid URL'}) //TODO: handle this in a better way
})


app.listen(port, host, () => {
  console.log(`RequestBin is listening on port ${port} of ${host}!`);
});
