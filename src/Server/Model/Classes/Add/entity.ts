import { IStrategy } from '../Types/strategy';
import { IEntity } from '../../Types/entity';
import { EntityExistsException } from '../../../../Common/Errors';
import { IModel } from '../../../../Schemas/model.schema';
import { UpdateQuery } from 'mongoose';
import { TValue } from '../Types/value';

export class AddEntityStrategy implements IStrategy {
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
    const entity = this.value as IEntity;
    if (
      this.model.entities.includes(entity) ||
      this.model.entities.find((e) => e.name === entity.name)
    )
      throw new EntityExistsException();
    return [{ $addToSet: { [this.field]: this.value } }];
  }
}
