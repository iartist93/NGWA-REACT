// import TestData from '../data/TestData.json';

const data = require('./data/TestData.json');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));

app.get('/questions', (req, res) => {
  res.send(data.wordList.filter((_, index) => index <= 10));
});

app.post('/rank', (req, res) => {
  const { score } = req.body;
  const scoresList = data.scoresList;
  const filteredRanks = scoresList.filter((rank) => rank < score).length;
  const newRank = (filteredRanks / scoresList.length) * 100;
  const roundedRank = Math.round(newRank * 100) / 100;

  console.log(req.body, scoresList.length, filteredRanks, roundedRank);

  res.end(JSON.stringify({ rank: roundedRank }));
});
