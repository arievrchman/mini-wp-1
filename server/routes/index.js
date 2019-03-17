var routes = require('express').Router();
const { register, login, checkUser, googleLogin } = require('../controllers/user');
const { zapAuth, googleAuth } = require('../middlewares/authenticate');

/* GET home page. */
routes.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

routes.post('/oauth', googleAuth, googleLogin);

routes.post('/register', register);
routes.post('/login', login);
routes.get('/auth', zapAuth, checkUser);

module.exports = routes;
