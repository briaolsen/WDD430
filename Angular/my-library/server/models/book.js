const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  series: { type: String },
  first: { type: String, },
  last: { type: String, required: true },
  url: { type: String },
  read: { type: Boolean, required: true }
});

module.exports = mongoose.model('Book', bookSchema);