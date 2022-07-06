import * as _ from 'lodash';
import { IStrategy } from '../Types/strategy';
import { IModel } from '../../../../Schemas/model.schema';
import { UpdateQuery } from 'mongoose';
import { TValue } from '../Types/value';
import {
  InvalidAssociationException,
  InvalidPathException,
} from '../../../../Common/Errors';
import { IAssociation } from '../../Types/association';

export class EditAssociationStrategy implements IStrategy {
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
    const [, index] = _.split(this.field, '.');
    if (!this.model.associations[index]) throw new InvalidPathException();
    const { source, target } = this.value as IAssociation;
    if (
      !this.model.entities.find(
        (entity) => entity.name === source || entity.name === target,
      ) ||
      source === target
    )
      throw new InvalidAssociationException();
    return [{ $set: { [this.field]: this.value } }];
  }
}
