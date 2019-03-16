const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let articleSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: [true, 'title cannot be empty']
  },
  tags: {
    type: [ Schema.Types.ObjectId ],
    ref: 'tag'
  },
  content: {
    type: String,
    required: [true, 'content cannot be empty']
  },
  feature_image: {
    type: String
  },
  created_at: {
    type: Date,
    default: new Date
  },
});

let Article = mongoose.model('article', articleSchema);

module.exports = Article;