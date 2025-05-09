const express = require('express');
const app = express();
const host = "localhost"; 
const port = 3000;

app.listen(port, host, () => {
  console.log(`Parks is listening on port ${port} of ${host}!`);
});
