import * as _ from 'lodash';
import { IStrategy } from '../Types/strategy';
import { IModel } from '../../../../Schemas/model.schema';
import { UpdateQuery } from 'mongoose';
import { TValue } from '../Types/value';
import {
  CannotDeleteAllAttributesException,
  InvalidPathException,
} from '../../../../Common/Errors';

export class DeleteAttributeStrategy implements IStrategy {
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
    const [property, index, subProperty, subIndex] = _.split(this.field, '.');
    const attributes = this.model.entities[index].attributes;
    if (attributes.length === 1) throw new CannotDeleteAllAttributesException();
    if (!attributes[subIndex]) throw new InvalidPathException();
    return [
      {
        $pull: {
          [`${property}.${index}.${subProperty}`]: {
            name: attributes[subIndex].name,
          },
        },
      },
    ];
  }
}
