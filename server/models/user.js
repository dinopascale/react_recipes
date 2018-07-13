const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true,
    minlength: [6, 'Your password must be at least six characters long']
  }
});

userSchema.methods.generateAuthToken = async function() {
  try {
    const user = this;
    const token = await jwt.sign(
      { email: user.email, userId: user._id },
      process.env.JWT_SECRET || 'notSoSecret',
      {
        expiresIn: '1h'
      }
    );
    return token;
  } catch (e) {
    throw e;
  }
};

userSchema.statics.findByCredentials = async function(email, password) {
  try {
    const User = this;
    const user = await User.findOne({ email });

    if (!user) {
      const e = new Error('Auth Failed');
      e.status = 401;
      throw e;
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (passwordCompare) {
      return user;
    } else {
      const e = new Error('Auth failed');
      e.status = 401;
      throw e;
    }
  } catch (e) {
    throw e;
  }
};

userSchema.pre('save', async function(next) {
  try {
    const bpassword = await bcrypt.hash(this.password, 10);
    this.password = bpassword;
  } catch (e) {
    next(e);
  }
});

userSchema.post('save', function(err, doc, next) {
  if (err.name === 'MongoError' && err.code === 11000) {
    const e = new Error('Email already taken');
    e.statuss = 409;
    next(e);
  } else {
    next(err);
  }
});

module.exports = mongoose.model('User', userSchema);
