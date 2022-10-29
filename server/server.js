// import TestData from '../data/TestData.json';

const data = require('./data/TestData.json');

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));

// create a GET route
app.get('/questions', (req, res) => {
  res.send(data.wordList.filter((_, index) => index <= 4));
});
