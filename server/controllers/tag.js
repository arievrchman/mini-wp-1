const Tag = require('../models/tag');
const Article = require('../models/article');

module.exports = {
  findTags(req, res) {
    Tag
      .find({})
      .then((tags) => {
        res.json(tags);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  findArticleByTags(req, res) {
    Tag.findOne({ tagName: req.params.name })
      .then(tag => {
        if (!tag) {
          res.status(404).json({ message: 'Tag not found' });
        } else {
          let id = tag._id;
          return Article.find({ tags: id }).populate('author', 'name')
        }
      })
      .then(article => {
        res.json(article);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
};
