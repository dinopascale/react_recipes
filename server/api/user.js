const express = require('express');
const { ObjectId } = require('mongoose').Types;
const checkAuth = require('../middleware/check-auth');
const checkAuthor = require('../middleware/check-author');

const User = require('../models/user');

const router = express.Router();

//ONLY FOR DEV, NOT USABLE IN PRODUCTION

router.get('/users', async (req, res, next) => {
  try {
    const users = await User.find({}).select('-__v');
    res.status(200).json({ total: users.length, users });
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

//USER LOGIN

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

//USER SIGNUP

router.post('/user/signup', async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    const user = await new User({ email, password, username }).save();

    const token = await user.generateAuthToken();

    res.status(200).json({ message: 'User Subs', user, token });
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

//GET SINGLE USER - EDITABLE IF AUTHOR

router.get('/user/:id', async (req, res, next) => {});

//UPDATE SINGLE USER - GUARDED

router.patch('/user/:id', checkAuth, checkAuthor, async (req, res, next) => {});

//DELETE SINGLE USER - GUARDED

router.delete('/user/:id', checkAuth, checkAuthor, async (req, res, next) => {
  try {
    const { id } = res.locals;
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
