// eslint-disable-next-line new-cap
const router = require('express').Router();
const Book = require('../models/book');

router
  .post('/', (req, res, next) => {
    Book.create(req.body)
      .then(book => res.json(book))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Book.findById(req.params.id)
      .then(book => res.json(book))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Book.find()
      .then(books => res.json(books))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .then(book => res.json(book))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Book.findByIdAndRemove(req.params.id)
      .then(book => res.json(book))
      .catch(next);
  });

module.exports = router;