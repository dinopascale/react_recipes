const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({
    meta: {
      message: err.message
    },
    data: {}
  });
  next();
};

module.exports = errorHandler;
