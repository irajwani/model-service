const ERRORS = {
  INTERNAL_SERVER: {
    code: -1,
    error: 'INTERNAL_SERVER_ERROR',
    message: 'Internal Server Error',
  },
  INVALID_CREDENTIALS: {
    code: 1,
    error: 'INVALID_CREDENTIALS_ERROR',
    message: 'Incorrect email/password',
  },
  INSUFFICIENT_PERMISSION: {
    code: 2,
    error: 'INSUFFICIENT_PERMISSION_ERROR',
    message:
      'You are not authorized. Please use a valid set of credentials or a valid jwt.',
  },
  USER_DOES_NOT_EXIST: {
    code: 3,
    error: 'USER_DOES_NOT_EXIST',
    message: 'No user with that username and password combination exists.',
  },
  USER_EXISTS: {
    code: 4,
    error: 'USER_EXISTS_ERROR',
    message: 'User with this username already exists',
  },
  DECK_NOT_FOUND: {
    code: 5,
    error: 'DECK_NOT_FOUND',
    message: 'Deck does not exist. Please provide a valid Deck ID.',
  },
  INVALID_DRAW: {
    code: 6,
    error: 'INVALID_DRAW',
    message:
      'Attempting to draw more cards than amount left in deck. Please lower your draw count.',
  },
};

export { ERRORS };
