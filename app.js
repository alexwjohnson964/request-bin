const express = require('express');
const app = express();
const host = "localhost"; 
const port = 3000;
const uuid = require('short-uuid');


function generateBasketURL() {
  const basket_url = uuid.generate();
  console.log(basket_url);  
}

app.listen(port, host, () => {
  generateBasketURL();
  console.log(`RequestBin is listening on port ${port} of ${host}!`);
});
