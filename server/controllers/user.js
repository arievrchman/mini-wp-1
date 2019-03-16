const User = require('../models/user');
const jwt = require('jsonwebtoken');
const compare = require('../helpers/bcrypt').comparePassword;

module.exports = {
  register(req, res) {
    let newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    User
      .create(newUser)
      .then(user => {
        res.status(201).json({
          user,
          message: 'successfully create account'
        })
      })
      .catch(err => {
        let error = err.errors;
        if (error.hasOwnProperty('name')) {
          res.status(400).json(error.name.message);
        } else if (error.hasOwnProperty('email')) {
          res.status(400).json(error.email.message);
        } else if (error.hasOwnProperty('password')) {
          res.status(400).json(error.password.message);
        } else {
          res.status(500).json(err);
        }
      });
  },
  login(req, res) {
    User
      .findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          let isValid = compare(req.body.password, user.password);
          if (isValid) {
            let payload = {
              id: user._id,
              name: user.name,
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
    User
      .findOne({ email: req.auth_user.email })
      .select('-password')
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

