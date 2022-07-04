import * as _ from 'lodash';

import { IStrategy } from '../Types/strategy';
import {
  AttributeExistsException,
  InvalidPathException,
} from '../../../../Common/Errors';
import { IModel } from '../../../../Schemas/model.schema';
import { UpdateQuery } from 'mongoose';
import { TValue } from '../Types/value';
import { IAttribute } from '../../Types/attribute';

export class AddAttributeStrategy implements IStrategy {
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
    if (!this.model.entities[index] || !this.model.entities[index].attributes) {
      throw new InvalidPathException();
    }

    const attribute = this.value as IAttribute;

    if (
      this.model.entities[index].attributes.find(
        (a) => a.name === attribute.name,
      )
    ) {
      throw new AttributeExistsException();
    }

    return [{ $addToSet: { [this.field]: this.value } }];
  }
}
