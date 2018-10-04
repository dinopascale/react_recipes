const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
  const clearTokenAndCreateError = (mex = 'Auth Failed') => {
    res.clearCookie('token');
    const e = new Error(mex);
    e.status = 401;
    return e;
  };

  try {
    const { token } = req.cookies;

    if (!token) {
      throw clearTokenAndCreateError();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'notSoSecret');

    if (decoded.exp <= Date.now() / 1000) {
      throw clearTokenAndCreateError('Token Expired');
    }

    const userExist = !!(await User.findOne({ _id: decoded.userId }));

    if (userExist) {
      res.locals.issuerId = decoded.userId;
      next();
    } else {
      throw new Error('no user found');
    }
  } catch (e) {
    res.locals.issuerId = null;
    next();
  }
};
