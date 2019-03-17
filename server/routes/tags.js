const routes = require('express').Router();
const { findTags, findArticleByTags } = require('../controllers/tag');

routes.get('/', findTags);
routes.get('/:name', findArticleByTags);

module.exports = routes;