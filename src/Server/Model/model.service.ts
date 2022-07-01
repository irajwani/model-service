import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { CreateModelDto } from './Validation/create-model.dto';
import { UpdateModelDto } from './Validation/update-model.dto';
import {
  InternalServerException,
  ModelExistsException,
  ModelNotFoundException,
  MongooseErrorCodes,
} from '../../Common/Errors';
import { ModelRepository } from './model.repository';
import { IPatch } from './Types/patch';
import { QueryGenerators } from './Classes/query-generators';

@Injectable()
export class ModelService {
  constructor(private modelRepository: ModelRepository) {}

  async create(createModelDto: CreateModelDto): Promise<string> {
    // const { entities, associations } = createModelDto;
    // const entityNames = entities.map((e) => e.name);
    try {
      const { _id } = await this.modelRepository.create(createModelDto);
      return _id;
    } catch (e) {
      if (e.code === MongooseErrorCodes.UniquePropViolation) {
        throw new ModelExistsException();
      }
      throw new InternalServerException();
    }
  }

  async findOne(_id: string) {
    const model = await this.modelRepository.findById(_id);
    if (!model) throw new ModelNotFoundException();
    return model;
  }

  async update(_id: string, { deltas }: UpdateModelDto) {
    try {
      const model = await this.findOne(_id);
      const updateQuery = {};
      const updateSequence = [];
      _.forEach(deltas, function ({ op, path, value }: IPatch) {
        const QueryGenerator = QueryGenerators[op];
        const { update } = new QueryGenerator({ op, path, value, model });
        updateSequence.push(update);
      });

      // todo: organize queries to reduce constant calls to DB
      const updatePromises = [];
      for (let i = 0; i < updateSequence.length; i++) {
        updatePromises.push(
          this.modelRepository.updateOne({ _id }, updateSequence[i]),
        );
      }

      await Promise.all(updatePromises);
      return { result: true };
      // _.forEach(
      //   updateSequence,
      //   function ({ type, field, value }: IUpdateOperation) {
      //     if (!updateQuery[type]) {
      //       updateQuery[type] = { [field]: value };
      //     } else {
      //       updateQuery[type][field] = value;
      //     }
      //   },
      // );

      // return this.modelRepository.updateOne({ _id }, updateQuery);
    } catch (err) {
      throw err;
    }
  }
}

// {
//   $addToSet: {
//     entities: {
//       name: 'Cooler',
//           attributes: [{ name: 'cups', type: 'number' }],
//     },
//   },
//   $addToSet: {
//     'entities.1.attributes': { name: 'salary', type: 'number' },
//   },
// },
