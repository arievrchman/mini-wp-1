const routes = require('express').Router();
const { findTags } = require('../controllers/tag');

routes.get('/', findTags);

module.exports = routes;