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
  InvalidPathException,
  ModelExistsException,
  ModelNotFoundException,
  MongoCastToObjectIdFailedException,
  MongooseErrorCodes,
} from '../../Common/Errors';
import { ModelRepository } from './model.repository';
import { IPatch } from './Types/patch';
import { QueryGenerators } from './Classes/query-generators';
import { UpdateQuery } from 'mongoose';
import { IModel } from '../../Schemas/model.schema';
import { IAssociation } from './Types/association';
import { IEntity } from './Types/entity';
import { BulkWriteResult } from 'mongodb';
import { ERRORS } from '../../Common/Errors/messages';
import BaseGenerator from './Classes/base-generator';
import { IStrategy } from './Classes/Types/strategy';
import ModelLogic from './model.logic';

@Injectable()
export class ModelService {
  constructor(private modelRepository: ModelRepository) {}

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
    } catch (e) {
      if (e.reason && e.reason.message === ERRORS.CAST_TO_OBJECT_ID_FAILED)
        throw new MongoCastToObjectIdFailedException();
      throw e;
    }
  }

  public async update(
    _id: string,
    { deltas }: UpdateModelDto,
  ): Promise<BulkWriteResult> {
    try {
      const model = await this.findOne(_id);
      const updateSequence = ModelLogic.generateUpdateSequence(deltas, model);
      const filter = { _id };
      const bulkUpdate = updateSequence.map((update: UpdateQuery<IModel>) => ({
        updateOne: {
          filter,
          update,
        },
      }));
      return this.modelRepository.bulkWrite(bulkUpdate, { ordered: true });
    } catch (err) {
      throw err;
    }
  }
}
