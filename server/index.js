const express = require ('express');
const path = require('path');
const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/states', (req, res) => {
  res.sendFile(path.join(__dirname, '/data/states.json'));
});

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});