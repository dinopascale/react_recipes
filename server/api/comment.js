const express = require('express');
const { ObjectId } = require('mongoose').Types;

const { Comment, Thread } = require('../models/comment');
const checkAuth = require('../middleware/check-auth');
const checkAuthor = require('../middleware/check-author');

const router = express.Router();

//THREAD ROUTES

router.post('/thread/:id', checkAuth, async (req, res, next) => {});

router.get('/threads/:id', async (req, res, next) => {});

router.patch(
  '/thread/:id',
  checkAuth,
  checkAuthor,
  async (req, res, next) => {}
);

router.delete(
  '/thread/:id',
  checkAuth,
  checkAuthor,
  async (req, res, next) => {}
);

router.patch('/thread/vote/:id', checkAuth, async (req, res, next) => {});
