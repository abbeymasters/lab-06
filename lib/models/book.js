const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    required: false
  },
  yearPublished: {
    type: Number,
    required: true
  },
  genre: [{
    type: String,
    enum: ['romance', 'fiction', 'mystery', 'non-fiction', 'young-adult']
  }]
});

module.exports = mongoose.model('Book', schema);