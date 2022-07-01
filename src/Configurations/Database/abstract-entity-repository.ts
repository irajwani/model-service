import {
  Document,
  FilterQuery,
  Model,
  UpdateQuery,
  UpdateWriteOpResult,
  MongooseBulkWriteOptions,
} from 'mongoose';

import { BulkWriteResult, BulkWriteOptions } from 'mongodb';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async findById(
    _id: string,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    return this.entityModel
      .findById(_id, {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
        ...projection,
      })
      .exec();
  }

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    return this.entityModel
      .findOne(entityFilterQuery, {
        _id: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
        ...projection,
      })
      .exec();
  }

  async find(entityFilterQuery: FilterQuery<T>): Promise<T[] | null> {
    return this.entityModel.find(entityFilterQuery);
  }

  async create(createEntityData: unknown): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    return entity.save();
  }

  async updateOne(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<UpdateWriteOpResult | null> {
    return this.entityModel.updateOne(entityFilterQuery, updateEntityData);
  }

  async bulkWrite(
    operations,
    options: MongooseBulkWriteOptions | BulkWriteOptions,
  ): Promise<BulkWriteResult | null> {
    return this.entityModel.bulkWrite(operations, options);
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
    return deleteResult.deletedCount >= 1;
  }
}
