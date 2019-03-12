const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let articleSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId
  },
  title: {
    type: String,
    required: [true, 'title cannot be empty']
  },
  tags: {
    type: [ Schema.Types.ObjectId ]
  },
  content: {
    type: String,
    required: [true, 'description cannot be empty']
  },
  feature_iamge: {
    type: String
  },
  created_at: {
    type: Date,
    default: new Date
  },
});

let Article = mongoose.model('article', articleSchema);

module.exports = Article;