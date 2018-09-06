import validator from 'validator';

export const validationRules = {
  required: value => !validator.isEmpty(value),
  regExp: (value, re) => re.test(value),
  minlength: (value, min) => value.length >= min,
  isUrl: value => validator.isURL(value)
};

export const validationError = {
  required: () => 'Field is required',
  minlength: min => `Min length is ${min}`,
  isUrl: () => 'Not a valid url'
};
