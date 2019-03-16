var routes = require('express').Router();
const { createArticle, findAllArticle, findArticleById, updateArticle, deleteArticle, filterArticleByTitle } = require('../controllers/article');
const auth = require('../middlewares/authenticate');
const images = require('../helpers/images');

routes.get('/search', filterArticleByTitle);

routes.use(auth);
routes.post('/', images.multer.single('file'), images.sendUploadToGCS, createArticle);
routes.get('/', findAllArticle);
routes.get('/:id', findArticleById);


module.exports = routes;
