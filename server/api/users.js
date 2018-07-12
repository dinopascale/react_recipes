const express = require('express');
const router = express.Router();

router.post('/users', (req, res, next) => {
  return res.status(200).json({
    message: 'user subs!'
  });
});

module.exports = router;
