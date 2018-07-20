const User = require('../models/user');
const Recipe = require('../models/recipe');
const { ObjectId } = require('mongoose').Types;

module.exports = async (req, res, next) => {
  try {
    const issuer = await User.findById(res.locals.issuerId).select('_id');

    if (!issuer) {
      const e = new Error('Auth Failed');
      e.status = 401;
      throw e;
    }

    let authorId = new ObjectId(req.params.id);

    if (issuer._id.equals(authorId)) {
      res.locals.id = authorId;
      next();
    } else {
      const e = new Error("Not author, can't access");
      e.status = 401;
      throw e;
    }
  } catch (e) {
    next(e);
  }
};
