import { UpdateQuery } from 'mongoose';
import { IModel } from '../../../../Schemas/model.schema';
import { TValue } from './value';

export interface IStrategy {
  field: string;
  model: IModel;
  value: TValue;

  generateUpdateQuery(): UpdateQuery<IModel>[];
}
