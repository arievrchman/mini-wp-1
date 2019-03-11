const User = require('../models/user');
const jwt = require('jsonwebtoken');
const compare = require('../helpers/bcrypt').comparePassword;

module.exports = {
  register(req, res) {
    let newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password
    }
    User.create(newUser)
      .then(user => {
        res.status(201).json({
          user,
          message: 'successfully create account'
        })
      })
      .catch(err => {
        let error = err.errors;
        if (error.hasOwnProperty('first_name')) {
          res.status(400).json(err.first_name.message);
        } else if (error.hasOwnProperty('last_name')) {
          res.status(400).json(err.last_name.message);
        } else if (error.hasOwnProperty('email')) {
          res.status(400).json(err.email.message);
        } else if (error.hasOwnProperty('password')) {
          res.status(400).json(err.password.message);
        } else {
          res.status(500).json(err);
        }
      });
  },
  login(req, res) {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          let isValid = compare(req.body.password, user.password);
          if (isValid) {
            let payload = {
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email
            };
            let token = jwt.sign(payload, process.env.SECRET_KEY);
            res.json({
              token,
              message: 'successfully login'
            });
          } else {
            res.status(400).json({
              message: 'invalid email/password'
            })
          }
        } else {
          res.status(400).json({
            message: 'invalid email/password'
          });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  checkUser(req, res) {
    User.findOne({email: req.auth_user.email }).select('-password')
      .then(user => {
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ message: 'No such user!' });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
};

