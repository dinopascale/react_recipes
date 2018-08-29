const User = require('../models/user');
const { ObjectId } = require('mongoose').Types;
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      res.locals.issuerId = null;
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'notSoSecret');

    if (decoded.exp <= Date.now() / 1000) {
      res.locals.issuerId = null;
      return next();
    }

    res.locals.issuerId = await User.findOne({ _id: decoded.userId }).select(
      '_id'
    );
    next();
  } catch (e) {
    e.status = 400;
    next(e);
  }
};
