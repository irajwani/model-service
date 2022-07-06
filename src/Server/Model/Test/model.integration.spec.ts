import { Test } from '@nestjs/testing';
import {
  BadRequestException,
  HttpServer,
  HttpStatus,
  INestApplication,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { Connection } from 'mongoose';
import * as request from 'supertest';

import { AppModule } from '../../../app.module';
import { DatabaseService } from '../../../Configurations/Database/database.service';

import ModelStubs from './Stubs/model';
import { ERRORS } from '../../../Common/Errors/messages';
import { CreateModelDto } from '../Validation/create-model.dto';
import { UpdateModelDto } from '../Validation/update-model.dto';
import DeltasStub from './Stubs/deltas';
import EntityStubs from './Stubs/entity';

jest.setTimeout(60000);

describe('Model Service - E2E', () => {
  let dbConnection: Connection;
  let httpServer: HttpServer;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        exceptionFactory: (validationErrors: ValidationError[] = []) => {
          return new BadRequestException(validationErrors);
        },
      }),
    );
    dbConnection = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
    httpServer = app.getHttpServer();
    await app.init();
  });

  beforeEach(async () => {
    await dbConnection.collection('models').deleteMany({});
  });

  afterAll(async () => {
    await dbConnection.collection('models').deleteMany({});
    await app.close();
  });

  describe('GET model/:id', () => {
    it('should successfully get a specific model', async () => {
      const { insertedId: _id } = await dbConnection
        .collection('models')
        .insertOne(ModelStubs.S1T1);

      const response = await request(httpServer).get(`/model/${_id}`);

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toMatchObject(ModelStubs.S1T1);
    });

    it('throws cast to ObjectId error if model ID is malformed', async () => {
      await dbConnection.collection('models').insertOne(ModelStubs.S1T1);
      const malformedId = 'malformedId';
      const response = await request(httpServer).get(`/model/${malformedId}`);
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
      expect(response.body.message).toEqual(ERRORS.CAST_TO_OBJECT_ID_FAILED);
    });

    it('throws model not found error if model does not exist', async () => {
      await dbConnection.collection('models').insertOne(ModelStubs.S1T1);
      const id = '60f021d61234567890000002';
      const response = await request(httpServer).get(`/model/${id}`);
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
      expect(response.body).toEqual(ERRORS.MODEL_NOT_FOUND);
    });
  });

  describe('POST model/', () => {
    it('should successfully create a model with all required elements', async () => {
      const body: CreateModelDto = ModelStubs.S1T1;
      const response = await request(httpServer).post(`/model`).send(body);

      const model = await dbConnection
        .collection('models')
        .findOne({ name: body.name });
      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body).toEqual({ _id: String(model._id) });
    });

    it('throws a validation error due to missing prop "name" in request body', async () => {
      const body = {
        entities: ModelStubs.S1T1.entities,
        associations: ModelStubs.S1T1.associations,
      };

      const expectedValidationError = {
        isDefined: 'name should not be null or undefined',
        maxLength: 'name must be shorter than or equal to 40 characters',
        minLength: 'name must be longer than or equal to 1 characters',
        isString: 'name must be a string',
      };
      const response = await request(httpServer).post('/model').send(body);
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
      expect(response.body.message[0].constraints).toEqual(
        expectedValidationError,
      );
    });

    it('throws a validation error due to duplicate values in prop "entities" in request body', async () => {
      const body: CreateModelDto = {
        ...ModelStubs.S1T1,
        entities: [EntityStubs.S1T1.Librarian, EntityStubs.S1T1.Librarian],
      };

      const expectedValidationError = {
        arrayUnique: "All entities's elements must be unique",
      };
      const response = await request(httpServer).post('/model').send(body);
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
      expect(response.body.message[0].constraints).toEqual(
        expectedValidationError,
      );
    });

    it('fails uniqueness check because a model with the provided name already exists', async () => {
      await dbConnection.collection('models').insertOne(ModelStubs.S1T1);

      const body: CreateModelDto = ModelStubs.S1T1;
      const response = await request(httpServer).post('/model').send(body);
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
      expect(response.body).toEqual(ERRORS.MODEL_EXISTS);
    });
  });

  describe('PATCH decks/:id/deltas', () => {
    it.skip('should successfully update model (variant 1) with changes specified as deltas', async () => {
      const { insertedId: _id } = await dbConnection
        .collection('models')
        .insertOne(ModelStubs.S1T1);
      const body: UpdateModelDto = DeltasStub.S1T1;
      const response = await request(httpServer)
        .patch(`/model/${_id}/deltas`)
        .send(body);

      const alteredModel = await dbConnection
        .collection('models')
        .findOne({ _id });

      expect(response.status).toBe(HttpStatus.OK);
      expect(alteredModel).toMatchObject(ModelStubs.S3T1);
    });

    it('should successfully update model (variant 2) with changes specified as deltas', async () => {
      const { insertedId: _id } = await dbConnection
        .collection('models')
        .insertOne(ModelStubs.S1T2);
      const body: UpdateModelDto = DeltasStub.S1T2;
      const response = await request(httpServer)
        .patch(`/model/${_id}/deltas`)
        .send(body);

      const alteredModel = await dbConnection
        .collection('models')
        .findOne({ _id });

      expect(response.status).toBe(HttpStatus.OK);
      expect(alteredModel).toMatchObject(ModelStubs.S3T2);
    });

    // it('should throw a validation error when prop "count" is missing', async () => {
    //   await dbConnection.collection('decks').insertOne(decksStub.S1T1);
    //   const body = {};
    //   const response = await request(httpServer)
    //     .patch(`/deck/${decksStub.S1T1.deckId}`)
    //     .send(body);
    //
    //   const expectedValidationError = [
    //     {
    //       target: {},
    //       property: 'count',
    //       children: [],
    //       constraints: {
    //         max: 'count must not be greater than 52',
    //         min: 'count must not be less than 1',
    //         isInt: 'count must be an integer number',
    //       },
    //     },
    //   ];
    //   expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    //   expect(response.body.message).toEqual(expectedValidationError);
    // });
    //
    // it('should throw a validation error when prop "count" exceeds maximum', async () => {
    //   await dbConnection.collection('decks').insertOne(decksStub.S1T1);
    //   const body: DrawCardsDto = { count: 56 };
    //   const response = await request(httpServer)
    //     .patch(`/deck/${decksStub.S1T1.deckId}`)
    //     .send(body);
    //
    //   const expectedValidationError = [
    //     {
    //       children: [],
    //       constraints: {
    //         max: 'count must not be greater than 52',
    //       },
    //       property: 'count',
    //       target: {
    //         count: body.count,
    //       },
    //       value: body.count,
    //     },
    //   ];
    //   expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    //   expect(response.body.message).toEqual(expectedValidationError);
    // });
    //
    // it('should throw an error that deck is empty', async () => {
    //   await dbConnection.collection('decks').insertOne(decksStub.S2T3);
    //   const body: DrawCardsDto = { count: 2 };
    //   const response = await request(httpServer)
    //     .patch(`/deck/${decksStub.S2T3.deckId}`)
    //     .send(body);
    //
    //   expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    //   expect(response.body).toEqual(ERRORS.EMPTY_DECK);
    // });
    //
    // it('should throw an error that user attempted to draw more cards than possible from deck', async () => {
    //   await dbConnection.collection('decks').insertOne(decksStub.S1T3);
    //   const body: DrawCardsDto = { count: 34 };
    //   const response = await request(httpServer)
    //     .patch(`/deck/${decksStub.S1T3.deckId}`)
    //     .send(body);
    //
    //   expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    //   expect(response.body).toEqual(ERRORS.INVALID_DRAW);
    // });
  });
});
