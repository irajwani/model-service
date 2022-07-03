import { IModel } from '../../../../Schemas/model.schema';
import { Operations } from '../../Types/patch';
import { TValue } from './value';
import { UpdateQuery } from 'mongoose';
import { IStrategy } from './strategy';

export interface IBaseGenerator {
  op: Operations;
  path: string;
  value: TValue;
  model: IModel;
  type: string;
  field: string;
  update: UpdateQuery<IModel>;

  setStrategy(strategy: IStrategy): void;
  generatePathComponents(): string[];
  generateField(): string;
}
