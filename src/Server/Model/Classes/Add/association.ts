import { IStrategy } from '../Types/strategy';
import {
  AssociationExistsException,
  InvalidAssociationException,
} from '../../../../Common/Errors';
import { IModel } from '../../../../Schemas/model.schema';
import { UpdateQuery } from 'mongoose';
import { TValue } from '../Types/value';
import { IAssociation } from '../../Types/association';

export class AddAssociationStrategy implements IStrategy {
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
    const association = this.value as IAssociation;
    const { name, source, target } = association;
    if (
      this.model.associations.includes(association) ||
      this.model.associations.find((a) => a.name === name)
    )
      throw new AssociationExistsException();

    if (
      !this.model.entities.find(
        (entity) => entity.name === source || entity.name === target,
      ) ||
      source === target
    )
      throw new InvalidAssociationException();

    return [{ $addToSet: { [this.field]: this.value } }];
  }
}
