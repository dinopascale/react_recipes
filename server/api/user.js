const express = require('express');
const { ObjectId } = require('mongoose').Types;

const User = require('../models/user');

const router = express.Router();

router.post('/user/signup', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await new User({ email, password }).save();
    res.status(200).json({ message: 'User Subs', user });
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

router.post('/user/login', async (req, res, next) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();

    res.status(200).json({
      message: 'Login Success',
      token
    });
  } catch (e) {
    next(e);
  }
});

router.get('/user', async (req, res, next) => {
  try {
    const users = await User.find({}).select('-__v');
    res.status(200).json({ users });
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

router.delete('/user/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const obId = new ObjectId(id);

    const deletedUser = await User.findByIdAndRemove(obId);

    if (!deletedUser) {
      return res.status(404).json({
        message: `No user with ID: ${id} was found`
      });
    }

    res.status(200).json({
      message: 'User Deleted'
    });
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

module.exports = router;
