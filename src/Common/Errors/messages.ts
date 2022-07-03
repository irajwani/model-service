const ERRORS = {
  INTERNAL_SERVER: {
    code: -1,
    error: 'INTERNAL_SERVER_ERROR',
    message: 'Internal Server Error',
  },
  MODEL_EXISTS: {
    code: 1,
    error: 'MODEL_EXISTS_ERROR',
    message: 'Model Exists Error',
  },
  MODEL_NOT_FOUND: {
    code: 2,
    error: 'MODEL_NOT_FOUND_ERROR',
    message: 'Model Not Found Error',
  },
  INVALID_PATH: {
    code: 3,
    error: 'INVALID_PATH_ERROR',
    message:
      'Invalid Path Error. Path must contain names of elements part of meta model.',
  },
  INVALID_ENTITY: {
    code: 4,
    error: 'INVALID_ENTITY_ERROR',
    message:
      'Invalid Entity Error. Provided entity does not comply with the required structure.',
  },
  INVALID_ATTRIBUTE: {
    code: 5,
    error: 'INVALID_ATTRIBUTE_ERROR',
    message:
      'Invalid Attribute Error. Provided attribute does not comply with the required structure.',
  },
  INVALID_ASSOCIATION: {
    code: 6,
    error: 'INVALID_ASSOCIATION_ERROR',
    message:
      'Invalid Association Error. Provided association does not comply with the required structure.',
  },
  ENTITY_EXISTS: {
    code: 7,
    error: 'ENTITY_EXISTS_ERROR',
    message:
      'Entity Exists Error. The entity you are trying to add to this model already exists.',
  },
  ATTRIBUTE_EXISTS: {
    code: 8,
    error: 'ATTRIBUTE_EXISTS_ERROR',
    message:
      'Attribute Exists Error. The attribute you are trying to add already exists within this entity.',
  },
  ASSOCIATION_EXISTS: {
    code: 9,
    error: 'ASSOCIATION_EXISTS_ERROR',
    message:
      'Association Exists Error. The association you are trying to add already exists within this model.',
  },
  OPERATION_PATH_MISMATCH: {
    code: 10,
    error: 'OPERATION_PATH_MISMATCH_ERROR',
    message:
      'The operation selected cannot be performed on this path/resource.',
  },
  CANNOT_DELETE_ALL_ENTITIES: {
    code: 11,
    error: 'CANNOT_DELETE_ALL_ENTITIES_ERROR',
    message: 'You are attempting to delete all entities.',
  },
  CANNOT_DELETE_ALL_ATTRIBUTES: {
    code: 12,
    error: 'CANNOT_DELETE_ALL_ATTRIBUTES_ERROR',
    message:
      'You are attempting to delete all attributes of a specific entity.',
  },
  CAST_TO_OBJECT_ID_FAILED:
    'Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer',
};

export { ERRORS };
