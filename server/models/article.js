const mongoose =require('mongoose');
const Schema = mongoose.Schema;

let articleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'title cannot be empty']
  },
  content: {
    type: String,
    required: [true, 'description cannot be empty']
  },
  created_at: {
    type: Date,
    default: new Date
  },
  imgurl: {
    type: String
  },
});

let Article = mongoose.model('article', articleSchema);

module.exports = Article;