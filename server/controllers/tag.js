const Tag = require('../models/tag');

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
  }
};
