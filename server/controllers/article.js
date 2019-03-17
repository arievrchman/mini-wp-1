const Article = require('../models/article');
const Tag = require('../models/tag');

module.exports = {
  createArticle(req, res) {

    let tags = req.body.tags.split(',');
    let arrayTag = [];
    let sendTags = [];
    let img;

    if (req.file) {
      img = req.file.cloudStoragePublicUrl
    } else {
      img = process.env.NOT_FOUND
    }

    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];
      let tmpTag = new Promise((resolve, reject) => {
        Tag
          .findOne({
            tagName: tag
          })
          .then(result => {
            if (result) {
              resolve(result);
            } else {
              return Tag
                .create({ tagName: tag })
                .then(result => {
                  resolve(result);
                });
            }
          })
          .catch(err => {
            reject(err);
          });
      });
      arrayTag.push(tmpTag);
    }

    Promise
      .all(arrayTag)
      .then(tags => {
        sendTags = tags;
        let tagId = tags.map(tag => {
          return tag.id;
        });
        let newArticle = {
          author: req.auth_user.id,
          title: req.body.title,
          content: req.body.content,
          tags: tagId,
          featured_image: img
        };
        return Article.create(newArticle);
      })
      .then(article => {
        // console.log(article, '==========>');
        let sendArticleToClient = {
          id: article._id,
          author: article.name,
          title: article.title,
          tags: sendTags,
          content: article.content,
          created_at: article.created_at,
          featured_image: article.featured_image
        }
        res.status(201).json({
          sendArticleToClient,
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
      .find({})
      .sort({ created_at: 'desc' })
      .populate('author', '-password')
      .then(articles => {
        res.json(articles);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  
  findArticleById(req, res) {
    Article
      .findById(req.params.id)
      .populate('tags')
      .populate('author')
      .then(article => {
        let tags = article.tags.map(tag => {
          return tag.tagName
        });
        // console.log(article.tags);

        let sendArticleToClient = {
          id: article._id,
          author: article.author.name,
          title: article.title,
          tags: tags,
          content: article.content,
          created_at: article.created_at,
          featured_image: article.featured_image
        }
        res.json(sendArticleToClient);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  
  updateArticle(req, res) {
    console.log(req.body);
    let tags = req.body.tags.split(',');
    let arrayTag = [];
    let sendTags = [];
    let img;

    if (req.file) {
      img = req.file.cloudStoragePublicUrl;
    } else {
      img = req.body.originalImg;
    }

    let genTags = tags.map(tag => {
      return new Promise((resolve, reject) => {
        Tag
          .findOne({ tagName: tag })
          .then(result => {
            if (result) {
              resolve(result);
            } else {
              return Tag.create({ tagName: tag })
                .then(result => {
                  resolve(result)
                });
            }
          })
          .catch(err => {
            reject(err);
          })
      });
    });

    Promise
      .all(genTags)
      .then(tags => {
        let tagId = tags.map(tag => {
          return tag.id
        });
        let updateArticle = {
          author: req.auth_user.id,
          title: req.body.title,
          content: req.body.content,
          tags: tagId,
          featured_image: img
        };
        return Article
          .findByIdAndUpdate(req.params.id, updateArticle, { new: true })
      })
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
    Article
      .find({ author: req.auth_user.id })
      .sort({ created_at: 'desc' })
      .populate('author', '-password')
      .then(articles => {
        res.json(articles);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  
  findNewestArticle(req, res) {
    Article
      .find({})
      .sort({ created_at: 'desc' })
      .populate('author', '-password')
      .limit(5)
      .then(articles => {
        res.json(articles);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
};
