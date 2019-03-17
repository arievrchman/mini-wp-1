const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

module.exports = {
  zapAuth(req, res, next) {
    let token = req.headers.token;
    if (!token) {
      res.status(401).json({ message: 'you must login first!' });
    } else {
      jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (err) {
          res.status(400).json(err.message);
        } else {
          req.auth_user = decoded;
          next();
        }
      });
    }
  },
  async googleAuth(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.headers.token,
        audience: process.env.CLIENT_ID
      });
      const payload = ticket.getPayload();
      req.ticket = payload;
      next();
    } catch (error) {
      res.status(400).json(error);
    }
  }
};
