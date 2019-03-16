var routes = require('express').Router();
const { createArticle, findAllArticle, findArticleById, updateArticle, deleteArticle, filterArticleByTitle, findNewestArticle } = require('../controllers/article');
const auth = require('../middlewares/authenticate');
const images = require('../helpers/images');

routes.get('/search', filterArticleByTitle);
routes.get('/newest', findNewestArticle);
routes.get('/', findAllArticle);
routes.get('/:id', findArticleById);

routes.use(auth);
routes.post('/', images.multer.single('file'), images.sendUploadToGCS, createArticle);


module.exports = routes;
