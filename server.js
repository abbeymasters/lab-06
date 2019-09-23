require('dotenv').config();
require('./lib/connect')();

const express = require('express');
const app = express();
const Book = require('./lib/models/book');

app.use(express.json());

app.get('/api/books', (req, res, next) => {
  Book.find()
    .then(books => {
      res.json(books);
    })
    .catch(next);
});

app.listen(3000, () => console.log('server running on 3000'));