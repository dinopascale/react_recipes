import validator from 'validator';

export const validationRules = {
  required: value => !validator.isEmpty(value),
  regExp: (value, re) => re.test(value),
  minlength: (value, min) => value.length >= min,
  isUrl: value => validator.isURL(value),
  isEmail: value => validator.isEmail(value)
};

export const validationError = {
  required: () => 'Field is required',
  minlength: min => `You need to insert at least ${min} characters`,
  isUrl: () => 'Not a valid url',
  isEmail: () => 'Not a valid email'
};
