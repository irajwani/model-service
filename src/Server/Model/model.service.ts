import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import {
  CreateModelDto,
  ICreateModelResponse,
} from './Validation/create-model.dto';
import { UpdateModelDto } from './Validation/update-model.dto';
import {
  InternalServerException,
  InvalidAssociationException,
  ModelExistsException,
  ModelNotFoundException,
  MongoCastToObjectIdFailedException,
  MongooseErrorCodes,
} from '../../Common/Errors';
import { ModelRepository } from './model.repository';
import { Connection, UpdateQuery } from 'mongoose';
import { IModel } from '../../Schemas/model.schema';
import { IAssociation } from './Types/association';
import { IEntity } from './Types/entity';
import { ERRORS } from '../../Common/Errors/messages';
import ModelLogic from './model.logic';
import { DatabaseService } from '../../Configurations/Database/database.service';

@Injectable()
export class ModelService {
  constructor(
    private readonly modelRepository: ModelRepository,
    private readonly databaseService: DatabaseService,
  ) {}

  private readonly dbConnection: Connection =
    this.databaseService.getDbHandle();

  private validateAssociationsAndEntities(
    entities: IEntity[],
    associations: IAssociation[],
  ) {
    const entityNames = _.map(entities, (e: IEntity) => e.name);
    const entitiesInAssociations = _.flatten(
      _.map(associations, (a: IAssociation) => [a.source, a.target]),
    );
    if (_.difference(entityNames, entitiesInAssociations).length > 0)
      throw new InvalidAssociationException();
  }

  public async create(
    createModelDto: CreateModelDto,
  ): Promise<ICreateModelResponse> {
    const { entities, associations } = createModelDto;
    this.validateAssociationsAndEntities(entities, associations);
    try {
      const { _id } = await this.modelRepository.create(createModelDto);
      return { _id };
    } catch (e) {
      if (e.code === MongooseErrorCodes.UniquePropViolation) {
        throw new ModelExistsException();
      }
      throw new InternalServerException();
    }
  }

  public async findOne(_id: string): Promise<IModel> {
    try {
      const model = await this.modelRepository.findById(_id);
      if (!model) throw new ModelNotFoundException();
      return model;
    } catch (err) {
      if (err.reason && err.reason.message === ERRORS.CAST_TO_OBJECT_ID_FAILED)
        throw new MongoCastToObjectIdFailedException();
      throw err;
    }
  }

  public async update(_id: string, { deltas }: UpdateModelDto): Promise<void> {
    const session = await this.dbConnection.startSession();
    session.startTransaction();
    try {
      const model = await this.findOne(_id);
      const bulkUpdate = new ModelLogic().generateUpdateSequence(
        _id,
        deltas,
        model,
      );
      await this.modelRepository.bulkWrite(bulkUpdate, { ordered: true });
      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      await session.endSession();
    }
  }
}
