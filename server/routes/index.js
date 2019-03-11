var routes = require('express').Router();
const { register, login, checkUser } = require('../controllers/user');
const auth = require('../middlewares/authenticate');

/* GET home page. */
routes.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

routes.post('/register', register);
routes.post('/login', login);
routes.get('/auth', auth, checkUser);

module.exports = routes;
