import * as _ from 'lodash';
import { IStrategy } from '../Types/strategy';
import { IModel } from '../../../../Schemas/model.schema';
import { UpdateQuery } from 'mongoose';
import { TValue } from '../Types/value';
import {
  CannotDeleteAllEntitiesException,
  InvalidPathException,
} from '../../../../Common/Errors';
import { ValidResources } from '../Types/valid-resources';

export class DeleteAssociationStrategy implements IStrategy {
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
    const association = this.model.associations[index];
    if (!association) throw new InvalidPathException();
    return [
      {
        $pull: { associations: { name: association.name } },
      },
    ];
  }
}
