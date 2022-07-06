import * as _ from 'lodash';
import { IStrategy } from '../Types/strategy';
import { IModel } from '../../../../Schemas/model.schema';
import { UpdateQuery } from 'mongoose';
import { TValue } from '../Types/value';
import { InvalidPathException } from '../../../../Common/Errors';
import { IAttribute } from '../../Types/attribute';

export class EditEntityAttributesStrategy implements IStrategy {
  field: string;
  model: IModel;
  value: TValue;

  constructor(field, model, value) {
    this.field = field;
    this.model = model;
    this.value = value;
    this.generateUpdateQuery();
  }

  public generateUpdateQuery(): UpdateQuery<IModel>[] {
    const index = _.split(this.field, '.')[1];
    if (!this.model.entities[index].attributes)
      throw new InvalidPathException();
    const attributes: IAttribute[] = this.value as IAttribute[];
    return [{ $set: { [this.field]: attributes } }];
  }
}
