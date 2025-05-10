const express = require('express');
const app = express();
const host = "localhost"; 
const port = 3000;
const uuid = require('short-uuid');
const pgPersistence = require('./lib/pg-persistence');
const sqlClient = new pgPersistence();

function generateBasketURL() {
  const basketUrl = uuid.generate();
  return basketUrl;
}


app.listen(port, host, () => {
  generateBasketURL();
  console.log(`RequestBin is listening on port ${port} of ${host}!`);
});

// Handle web hook get requests
app.get('/:requestURL', async (req, res) => {
  
})
// Handle web hook post request
app.post('/:requestURL', async (req, res) => {
  
})

// Create new basket
app.post('/baskets/new', async (req, res) => {
  const basketURL = generateBasketURL();
  await sqlClient.createBasket(basketURL);
  const newBasket = await sqlClient.getBasketByUrl(basketURL);
  res.json({newBasket})
})

// View an existing basket
app.get('/baskets/:basketURL', async (req, res) => {
  // Find the basket from the SQL database 
  const basketURL = req.params.basketURL;
  const basket = await sqlClient.getBasketByUrl(basketURL);
  res.json({basket});
})

app.get('/', async (req, res) => {
  res.json({error: 'not a valid URL'}) //TODO: handle this in a better way
})

// curl -X POST \
//       https://example.com/posts