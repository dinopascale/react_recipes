const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'notSoSecret');
    res.locals.issuerId = decoded.userId;
    next();
  } catch (e) {
    e.status = 401;
    e.message = 'Auth Failed';
    next(e);
  }
};
