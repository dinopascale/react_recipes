import validator from 'validator';

export const validationRules = {
  required: value => !validator.isEmpty(value),
  regExp: (value, re) => re.test(value),
  minlength: (value, min) => value.length >= min
};

export const validationError = {
  required: () => 'Field is required',
  minlength: min => `Min length is ${min}`
};
