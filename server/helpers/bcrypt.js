const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(8);

module.exports = {
  hashPassword(password) {
    return bcrypt.hashSync(password, salt);
  },
  comparePassword(req, password) {
    return bcrypt.compareSync(req, password);
  }
};
