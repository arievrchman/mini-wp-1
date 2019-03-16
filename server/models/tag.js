const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let tagSchema = new Schema({
  tagName: {
    type: String
  }
});

let Tag = mongoose.model('tag', tagSchema);

module.exports = Tag;