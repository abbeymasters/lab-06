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
    default: false
  },
  yearPublished: {
    type: Number,
    required: true
  },
  howMany: {
    type: Number,
    required: true,
    min: 0,
    max: 9
  },
  genre: [{
    type: String,
    enum: ['romance', 'fiction', 'mystery', 'non-fiction', 'young-adult']
  }],
  appearances: {
    pattern: String,
    mainColor: {
      type: String,
      required: true
    }
  }
});

module.exports = mongoose.model('Book', schema);