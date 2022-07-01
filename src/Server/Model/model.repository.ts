import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model as MongooseModel } from 'mongoose';
import { IModel, ModelDocument } from '../../Schemas/model.schema';
import { EntityRepository } from '../../Configurations/Database/abstract-entity-repository';

@Injectable()
export class ModelRepository extends EntityRepository<ModelDocument> {
  constructor(@InjectModel(IModel.name) model: MongooseModel<ModelDocument>) {
    super(model);
  }
}
