const express = require('express');
const { ObjectId } = require('mongoose').Types;

const checkAuth = require('../middleware/check-auth');
const checkAuthor = require('../middleware/check-author');

const Comment = require('../models/comment');
const Thread = require('../models/thread');
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

router.get('/thread/:recipeId', checkAuthor, async (req, res, next) => {
  try {
    const recipeId = new ObjectId(req.params.recipeId);
    const issuer = res.locals.issuerId;
    let threads = [];

    const query = await Thread.find({ recipeId }).populate(
      'user',
      'avatar username'
    );

    const queryFiltered = query.filter(thread => !thread.__t);

    if (issuer) {
      const promises = queryFiltered.map(async thread => {
        const rate = await CommentRate.find({
          userId: issuer._id,
          commentId: thread._id
        });
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
        number_of_threads: queryFiltered.length,
        threads: await Promise.all(promises)
      });
    } else {
      threads = [...queryFiltered];
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

    const threadToUpdate = await Thread.findById(obId);

    if (!threadToUpdate) {
      return res.status(404).json({
        message: `No thread with ID: ${id} was found`
      });
    }

    if (!threadToUpdate.user.equals(res.locals.issuerId)) {
      const e = new Error('Not Author');
      e.status = 401;
      throw e;
    }

    const update = await threadToUpdate.update(
      { $set: { text: req.body.text } },
      { new: true }
    );

    res.status(200).json({
      status: 'Ok',
      threadUpdate: update
    });
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

router.delete('/thread/:id', checkAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const obId = new ObjectId(id);

    const toDeletedThread = await Thread.findById(obId);

    if (!toDeletedThread) {
      return res.status(404).json({
        message: `No thread with ID: ${id} was found`
      });
    }

    const deletedThread = await toDeletedThread.remove();

    const commentsToDelete = await Comment.deleteMany({ threadId: obId });

    res.status(200).json({
      status: 'Ok',
      message: 'Thread and Comments Related Deleted'
    });
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

//COMMENT ROUTES

router.post('/comment/:threadId', checkAuth, async (req, res, next) => {
  try {
    const user = new ObjectId(res.locals.issuerId);
    const { threadId } = req.params;
    const { text } = req.body;

    const thread = await Thread.findOne({ _id: threadId }).select('recipeId');
    console.log(thread);

    const comment = await new Comment({
      user,
      recipeId: thread._doc.recipeId,
      text,
      threadId
    }).save();

    res.status(200).json({
      status: 'Ok',
      commentInfo: comment._doc
    });
  } catch (e) {
    e.status = 401;
    next(e);
  }
});

router.get('/comment/:threadId', checkAuthor, async (req, res, next) => {
  try {
    const threadId = new ObjectId(req.params.threadId);
    const issuer = res.locals.issuerId;
    let comments = [];

    const query = await Comment.find({ threadId }).populate(
      'user',
      'avatar username'
    );

    if (issuer) {
      const promises = query.map(async comment => {
        const rate = await CommentRate.find({
          userId: issuer._id,
          commentId: comment._id
        });
        let editable = !!comment.user._id.equals(issuer._id);
        return {
          ...comment._doc,
          editable,
          ratedBefore: rate.length > 0,
          userRate: rate[0] ? rate[0].value : false
        };
      });

      res.status(200).json({
        status: 'Ok',
        number_of_comments: query.length,
        comments: await Promise.all(promises)
      });
    } else {
      comments = [...query];
      res.status(200).json({
        status: 'Ok',
        number_of_comments: comments.length,
        comments
      });
    }
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

router.patch('/comment/:id', checkAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const obId = new ObjectId(id);

    const commentToUpdate = await Comment.findById(obId);

    if (!commentToUpdate) {
      return res.status(404).json({
        message: `No thread with ID: ${id} was found`
      });
    }

    if (!commentToUpdate.user.equals(res.locals.issuerId)) {
      const e = new Error('Not Author');
      e.status = 401;
      throw e;
    }

    const update = await commentToUpdate.update(
      { $set: { text: req.body.text } },
      { new: true }
    );

    res.status(200).json({
      status: 'Ok'
    });
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

router.delete('/comment/:id', checkAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const obId = new ObjectId(id);

    const toDeletedComment = await Comment.findById(obId);

    if (!toDeletedComment) {
      return res.status(404).json({
        message: `No comment with ID: ${id} was found`
      });
    }

    const deletedComment = await toDeletedComment.remove();

    res.status(200).json({
      status: 'Ok',
      message: 'Comment Deleted'
    });
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

module.exports = router;
