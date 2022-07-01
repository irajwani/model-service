import { IModel } from '../../../../Schemas/model.schema';
import { Operations } from '../../Types/patch';
import { TValue } from './value';
import { UpdateQuery } from 'mongoose';

export interface IBaseGenerator {
  op: Operations;
  path: string;
  value: TValue;
  model: IModel;
  type: string;
  field: string;
  update: UpdateQuery<IModel>;

  generatePathComponents(): string[];
  generateField(): string;
}
