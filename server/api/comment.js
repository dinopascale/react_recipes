const express = require('express');
const { ObjectId } = require('mongoose').Types;

const Comment = require('../models/comment');
const Thread = require('../models/thread');
const checkAuth = require('../middleware/check-auth');
const checkAuthor = require('../middleware/check-author');
const CommentRate = require('../models/rate/rateComment');

const router = express.Router();

//THREAD ROUTES

router.post('/thread/:recipeId', checkAuth, async (req, res, next) => {
  try {
    const user = new ObjectId(res.locals.issuerId);
    const { recipeId } = req.params;
    const { text } = req.body;

    const thread = await new Thread({
      user,
      recipeId,
      text
    }).save();

    res.status(200).json({
      status: 'Ok',
      threadInfo: thread._doc
    });
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

router.get('/threads/:recipeId', checkAuthor, async (req, res, next) => {
  try {
    const recipeId = new ObjectId(req.params.recipeId);
    const issuer = res.locals.issuerId;
    let threads = [];

    const query = await Thread.find({ recipeId }).populate(
      'user',
      'avatar username'
    );

    if (issuer) {
      const promises = query.map(async thread => {
        const rate = await CommentRate.find({
          userId: issuer._id,
          commentId: thread._id
        });
        console.log();
        let editable = !!thread.user._id.equals(issuer._id);
        return {
          ...thread._doc,
          editable,
          ratedBefore: rate.length > 0,
          userRate: rate[0] ? rate[0].value : false
        };
      });

      res.status(200).json({
        status: 'Ok',
        number_of_threads: threads.length,
        threads: await Promise.all(promises)
      });
    } else {
      threads = [...query];
      res.status(200).json({
        status: 'Ok',
        number_of_threads: threads.length,
        threads
      });
    }
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

router.patch('/thread/:id', checkAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const obId = new ObjectId(id);

    const threadToUpdate = await Thread.findById(obId).populate('user', '_id');

    if (!threadToUpdate) {
      return res.status(404).json({
        message: `No thread with ID: ${id} was found`
      });
    }

    if (!threadToUpdate.user._id.equals(res.locals.issuerId)) {
      const e = new Error('Not Author');
      e.status = 401;
      throw e;
    }

    const update = await threadToUpdate.update(
      { $set: { text: req.body.text } },
      { new: true }
    );

    res.status(200).json({
      status: 'ok',
      threadUpdate: update
    });
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

router.delete(
  '/thread/:id',
  checkAuth,
  checkAuthor,
  async (req, res, next) => {}
);

router.patch('/thread/vote/:id', checkAuth, async (req, res, next) => {});

module.exports = router;
