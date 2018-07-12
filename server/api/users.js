const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.post('/users', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await new User({ email, password }).save();
    res.status(200).json({ message: 'User Subs', user });
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

router.get('/users', async (req, res, next) => {
  try {
    const users = await User.find({}).select('-__v');
    res.status(200).json({ users });
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

module.exports = router;
