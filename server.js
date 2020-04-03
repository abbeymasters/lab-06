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

app.get('/api/books/:id', (req, res, next) => {
  Book.findById(req.params.id)
    .then(book => {
      res.json(book);
    })
    .catch(next);
});

app.post('/api/books', (req, res, next) => {
  Book.create(req.body)
    .then(book => {
      res.json(book);
    })
    .catch(next);
});

app.put('/api/books/:id', (req, res, next) => {
  Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
    .then(book => {
      res.json(book);
    })
    .catch(next);
});

app.delete('/api/books/:id', (req, res, next) => {
  Book.findByIdAndRemove(req.params.id)
    .then(removed => {
      res.json(removed);
    })
    .catch(next);
});

app.listen(3000, () => console.log('server running on 3000'));