const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
  maxBookId: { type: String }
});

module.exports = mongoose.model('Sequence', sequenceSchema);