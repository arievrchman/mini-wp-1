const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hash = require('../helpers/bcrypt').hashPassword;

let userSchema = new Schema({
  first_name: {
    type: String,
    required: [true, 'first name is required']
  },
  last_name: {
    type: String,
    required: [true, 'last name is required']
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    validate: {
      isAsync: true,
      validator(value) {
        return new Promise((resolve, reject) => {
          User.find({email: value}, function(err, user) {
            if (user.length > 0) {
              reject(false);
            } else {
              resolve(true);
            }
          });
        });
      },
      message: props => 'email already exists!'
    }
  },
  password: {
    type: String,
    required: [true, 'email is required']
  },
  profile_picture: {
    type: String
  }
});

userSchema.pre('save', function(next) {
  this.password = hash(this.password);
  next();
});

let User = mongoose.model('user', userSchema);

module.exports = User;