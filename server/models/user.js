const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
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
    minlength: 6
  },
  bio: {
    type: String,
    trim: true,
    maxlength: 140
  },
  avatar: {
    type: String,
    trim: true,
    default:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/240px-Placeholder_no_text.svg.png',
    validate: {
      validator: validator.isURL,
      message: '{VALUE} is not a URL'
    }
  }
});

const filterUserSchema = obj => {
  return Object.keys(obj)
    .filter(key => ['username', 'email', 'password'].includes(key))
    .map(key => {
      return {
        name: obj[key].path,
        instance: obj[key].instance,
        default: obj[key].options.default || null,
        validationRules: {
          required: obj[key].options.required || null,
          minlength: obj[key].options.minlength || null,
          regExp: obj[key].options.match
            ? [obj[key].options.match[0].toString(), obj[key].options.match[1]]
            : null
        },
        enum: obj[key].options.enum || null,
        subSchema: obj[key].schema
          ? filterUserSchema(obj[key].schema.paths)
          : null
      };
    });
};

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

userSchema.statics.getSchema = function() {
  const User = this;
  return filterUserSchema(User.schema.paths);
};

userSchema.statics.findByCredentials = async function(email, password) {
  try {
    const User = this;
    const user = await User.findOne({ email });

    if (!user) {
      const e = new Error(`No user with email ${email}`);
      e.status = 401;
      throw e;
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (passwordCompare) {
      return user;
    } else {
      const e = new Error('Password incorrect');
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
    const e = new Error();
    e.message = err.message.includes('email')
      ? 'Email already taken'
      : 'Username already taken';
    next(e);
  } else {
    next(err);
  }
});

module.exports = mongoose.model('User', userSchema);
