const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
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

    res.locals.issuerId = decoded.userId;
    next();
  } catch (e) {
    res.locals.issuerId = null;
    next();
  }
};
