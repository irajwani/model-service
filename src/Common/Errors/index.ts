import { HttpException, HttpStatus } from '@nestjs/common';
import { ERRORS } from './messages';

export class InternalServerException extends HttpException {
  constructor() {
    super(ERRORS.INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class ModelExistsException extends HttpException {
  constructor() {
    super(ERRORS.MODEL_EXISTS, HttpStatus.BAD_REQUEST);
  }
}

export class ModelNotFoundException extends HttpException {
  constructor() {
    super(ERRORS.MODEL_NOT_FOUND, HttpStatus.BAD_REQUEST);
  }
}

export class InvalidPathException extends HttpException {
  constructor() {
    super(ERRORS.INVALID_PATH, HttpStatus.BAD_REQUEST);
  }
}

export class InvalidEntityException extends HttpException {
  constructor() {
    super(ERRORS.INVALID_ENTITY, HttpStatus.BAD_REQUEST);
  }
}

export class InvalidAttributeException extends HttpException {
  constructor() {
    super(ERRORS.INVALID_ATTRIBUTE, HttpStatus.BAD_REQUEST);
  }
}

export class InvalidAssociationException extends HttpException {
  constructor() {
    super(ERRORS.INVALID_ASSOCIATION, HttpStatus.BAD_REQUEST);
  }
}

export class EntityExistsException extends HttpException {
  constructor() {
    super(ERRORS.ENTITY_EXISTS, HttpStatus.BAD_REQUEST);
  }
}

export class AttributeExistsException extends HttpException {
  constructor() {
    super(ERRORS.ATTRIBUTE_EXISTS, HttpStatus.BAD_REQUEST);
  }
}

export class AssociationExistsException extends HttpException {
  constructor() {
    super(ERRORS.ASSOCIATION_EXISTS, HttpStatus.BAD_REQUEST);
  }
}

export class OperationPathMismatchException extends HttpException {
  constructor() {
    super(ERRORS.OPERATION_PATH_MISMATCH, HttpStatus.BAD_REQUEST);
  }
}

export class CannotDeleteAllEntitiesException extends HttpException {
  constructor() {
    super(ERRORS.CANNOT_DELETE_ALL_ENTITIES, HttpStatus.BAD_REQUEST);
  }
}

export class CannotDeleteAllAttributesException extends HttpException {
  constructor() {
    super(ERRORS.CANNOT_DELETE_ALL_ATTRIBUTES, HttpStatus.BAD_REQUEST);
  }
}

export class MongoCastToObjectIdFailedException extends HttpException {
  constructor() {
    super(ERRORS.CAST_TO_OBJECT_ID_FAILED, HttpStatus.BAD_REQUEST);
  }
}

export enum MongooseErrorCodes {
  UniquePropViolation = 11000,
}
