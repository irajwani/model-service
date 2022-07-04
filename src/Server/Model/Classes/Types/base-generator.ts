import { IModel } from '../../../../Schemas/model.schema';
import { UpdateQuery } from 'mongoose';
import { IStrategy } from './strategy';

export interface IBaseGenerator {
  strategy: IStrategy;
  update: UpdateQuery<IModel>[];

  generate(): void;
}
