const errorHandler = (err, req, res, next) => {
  console.log(err);
  //   res.status(err.status || 500).json({
  //     error: {
  //       message: err.message
  //     }
  //   });
  next();
};

module.exports = errorHandler;
