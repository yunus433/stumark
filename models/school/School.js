const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SchoolSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  town: {
    type: String,
    required: true
  },
  other_names: {
    type: Array,
    default: []
  },
  users: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model('School', SchoolSchema);
