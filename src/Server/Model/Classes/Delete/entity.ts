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

export class DeleteEntityStrategy implements IStrategy {
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
    if (this.model.entities.length === 1)
      throw new CannotDeleteAllEntitiesException();

    if (!this.model.entities[index]) throw new InvalidPathException();

    const entityName = this.model.entities[index].name;
    return [
      { $pull: { entities: { name: entityName } } },
      {
        $pull: {
          [ValidResources.associations]: {
            $or: [{ source: entityName }, { target: entityName }],
          },
        },
      },
    ];
  }
}
