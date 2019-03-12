const Article = require('../models/article');

module.exports = {
  createArticle(req, res) {
    let newArticle = {
      title: req.body.title,
      content: req.body.content,
    };
    Article.create(newArticle)
      .then(article => {
        res.status(201).json({
          article,
          message: 'successfully create article'
        })
      })
      .catch(err => {
        let error = err.errors;
        if (error.hasOwnProperty('title')) {
          res.status(400).json(error.title.message);
        } else if (error.hasOwnProperty('content')) {
          res.status(400).json(error.content.message);
        } else {
          res.status(500).json(err);
        }
      });
  },
  findAllArticle(req, res) {
    Article
      .find({}).sort('created_at')
      .then(articles => {
        res.json(articles);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  findArticleById(req, res) {
    Article
      .findById(req.params.id).sort('created_at')
      .then(articles => {
        res.json(articles);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  updateArticle(req, res) {
    Article
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(article => {
        res.json({
          article,
          message: 'article updated!'
        })
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  deleteArticle(req, res) {
    Article
      .findByIdAndDelete(req.params.id)
      .then(article => {
        res.json({
          article,
          message: 'article deleted'
        });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  filterArticleByTitle(req, res) {
    Article
      .find({
        title: { $regex: req.query.title, $options: 'i' }
      })
      .then(article => {
        res.json(article);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  findAuthorArticle(req, res) {
    
  }
};
