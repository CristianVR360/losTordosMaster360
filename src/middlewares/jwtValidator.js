const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.MY_SECRET_KEY_JWT, (err, user) => {
      if (err) {
        return res.status(403).json({
          message: 'JWT invalid',
        });
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json({
      message: 'Token not provided',
    });
  }
};

const authorizeAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.userId);

  if (user && user.role === 'ADMIN_ROLE') {
    next();
  } else {
    res.status(403).json({
      message: 'User is not admin',
    });
  }
};

module.exports = {
  authenticateJWT,
  authorizeAdmin,
};
