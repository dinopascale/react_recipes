const User = require('../models/user');
const { ObjectId } = require('mongoose').Types;
const jwt = require('jsonwebtoken');

// module.exports = async (req, res, next) => {
//   try {
//     const issuer = await User.findById(res.locals.issuerId).select('_id');

//     if (!issuer) {
//       const e = new Error('Auth Failed');
//       e.status = 401;
//       throw e;
//     }

//     let authorId = new ObjectId(req.params.id);

//     if (issuer._id.equals(authorId)) {
//       res.locals.id = authorId;
//       next();
//     } else {
//       const e = new Error("Not author, can't access");
//       e.status = 401;
//       throw e;
//     }
//   } catch (e) {
//     next(e);
//   }
// };

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
