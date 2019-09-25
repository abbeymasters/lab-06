require('dotenv').config();
const connect = require('./lib/connect');
const mongoose = require('mongoose');

connect();

const Book = require('./lib/models/book');

Book.create({
  name: 'americanah',
  author: 'chimamanda ngozi adichie',
  available: true,
  yearPublished: 2013,
  howMany: 5,
  genre: ['fiction'],
  appearances: {
    pattern: 'solid',
    mainColor: 'white'
  }
})
  .then(createdBook => {
    console.log(createdBook);
  })
  .then(() => {
    mongoose.disconnect();
  });


