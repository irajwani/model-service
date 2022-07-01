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

@Injectable()
export class ModelService {
  constructor(private modelRepository: ModelRepository) {}

  async create(createModelDto: CreateModelDto): Promise<ICreateModelResponse> {
    const { entities, associations } = createModelDto;
    const entityNames = _.map(entities, (e: IEntity) => e.name);
    const entitiesInAssociations = _.flatten(
      _.map(associations, (a: IAssociation) => [a.source, a.target]),
    );
    if (_.difference(entityNames, entitiesInAssociations))
      throw new InvalidAssociationException();
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

  async findOne(_id: string): Promise<IModel> {
    const model = await this.modelRepository.findById(_id);
    if (!model) throw new ModelNotFoundException();
    return model;
  }

  async update(
    _id: string,
    { deltas }: UpdateModelDto,
  ): Promise<BulkWriteResult> {
    try {
      const model = await this.findOne(_id);
      const updateSequence = [];
      _.forEach(deltas, function ({ op, path, value }: IPatch) {
        const QueryGenerator = QueryGenerators[op];
        const { update } = new QueryGenerator({ op, path, value, model });
        updateSequence.push(...update);
      });
      const bulkUpdate = updateSequence.map((update: UpdateQuery<IModel>) => ({
        updateOne: {
          filter: { _id },
          update,
        },
      }));
      return this.modelRepository.bulkWrite(bulkUpdate, { ordered: true });
    } catch (err) {
      throw err;
    }
  }
}
