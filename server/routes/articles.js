var routes = require('express').Router();
const { createArticle, findAllArticle, findArticleById, updateArticle, deleteArticle, filterArticleByTitle, findAuthorArticle, findNewestArticle } = require('../controllers/article');
const { zapAuth } = require('../middlewares/authenticate');
const images = require('../helpers/images');

// routes.get('/', findAllArticle);
routes.get('/search', filterArticleByTitle);
routes.get('/newest', findNewestArticle);

routes.use(zapAuth);
routes.get('/user', findAuthorArticle);
routes.post('/', images.multer.single('file'), images.sendUploadToGCS, createArticle);
routes.get('/:id', findArticleById);new
routes.put('/:id', images.multer.single('file'), images.sendUploadToGCS, updateArticle);
routes.delete('/:id', deleteArticle);


module.exports = routes;
