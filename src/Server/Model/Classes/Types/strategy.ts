import { UpdateQuery } from 'mongoose';
import { IModel } from '../../../../Schemas/model.schema';
import { TValue } from './value';

export interface IStrategy {
  generateUpdateQuery(
    path: string,
    model: IModel,
    value: TValue,
  ): UpdateQuery<IModel>;
}
