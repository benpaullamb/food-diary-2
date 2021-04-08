export default {
  name: [
    {
      test: (value) => value.length >= 2,
      failMessage: 'Must have length greater than or equal to 2',
    },
  ],
  email: [
    {
      test: (value) => value.length >= 3,
      failMessage: 'Must have length greater than or equal to 3',
    },
    {
      test: (value) => value.match(/.+@.+/gi),
      failMessage: 'Must have an @',
    },
  ],
  password: [
    {
      test: (value) => value.length >= 8,
      failMessage: 'Must have length greater than or equal to 8',
    },
    {
      test: (value) => value.match(/\d/gi),
      failMessage: 'Must have a number',
    },
    {
      test: (value) => value.match(/[A-Z]/g),
      failMessage: 'Must have an uppercase letter',
    },
    {
      test: (value) => value.match(/[a-z]/g),
      failMessage: 'Must have a lowercase letter',
    },
  ],
  confirmPassword: [
    {
      test: (value) => value.length >= 8,
      failMessage: 'Must have length greater than or equal to 8',
    },
    {
      test: (value) => value.match(/\d/gi),
      failMessage: 'Must have a number',
    },
    {
      test: (value) => value.match(/[A-Z]/g),
      failMessage: 'Must have an uppercase letter',
    },
    {
      test: (value) => value.match(/[a-z]/g),
      failMessage: 'Must have a lowercase letter',
    },
  ],
};
