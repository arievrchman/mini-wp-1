var routes = require('express').Router();
const { createArticle, findAllArticle, findArticleById, updateArticle, deleteArticle, filterArticleByTitle } = require('../controllers/article');
const auth = require('../middlewares/authenticate');

routes.get('/search', filterArticleByTitle);

routes.use(auth);
routes.post('/', createArticle);
routes.get('/', findAllArticle);
routes.get('/:id', findArticleById);


module.exports = routes;
