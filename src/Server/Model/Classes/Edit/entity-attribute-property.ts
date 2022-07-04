import * as _ from 'lodash';
import { IStrategy } from '../Types/strategy';
import { IModel } from '../../../../Schemas/model.schema';
import { UpdateQuery } from 'mongoose';
import { TValue } from '../Types/value';
import { InvalidPathException } from '../../../../Common/Errors';
import { ValidProperties } from '../Types/valid-resources';

export class EditEntityAttributePropertyStrategy implements IStrategy {
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
    const subIndex = _.split(this.field, '.')[3];
    const attributeProperty = this.value as string;
    if (
      !this.model.entities[index].attributes[subIndex] ||
      (attributeProperty !== ValidProperties.name &&
        attributeProperty !== ValidProperties.type)
    )
      throw new InvalidPathException();
    return [{ $set: { [this.field]: this.value } }];
  }
}
