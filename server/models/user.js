const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hash = require('../helpers/bcrypt').hashPassword;

let userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    validate: {
      isAsync: true,
      validator(value) {
        return new Promise((resolve, reject) => {
          User
            .find({ email: value }, function (err, user) {
              if (user.length > 0) {
                reject(false);
              } else {
                resolve(true);
              }
            });
        });
      },
      message: 'email already exists!'
    }
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: [5, 'minimum length is 5 character'],
    match: [/^(?=.*[0-9])(?=.*[a-zA-Z])/, 'password should contain alphabet and number']
  },
  profile_picture: {
    type: String
  }
});

userSchema.pre('save', function (next) {
  this.password = hash(this.password);
  next();
});

let User = mongoose.model('user', userSchema);

module.exports = User;