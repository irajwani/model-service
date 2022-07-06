import * as _ from 'lodash';
import { IStrategy } from '../Types/strategy';
import { IModel } from '../../../../Schemas/model.schema';
import { UpdateQuery } from 'mongoose';
import { TValue } from '../Types/value';
import { InvalidPathException } from '../../../../Common/Errors';
import { ValidResources } from '../Types/valid-resources';
import { IAssociation } from '../../Types/association';

export class EditEntityNameStrategy implements IStrategy {
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
    const update: UpdateQuery<IModel>[] = [];
    const name = this.value as string;
    if (!this.model.entities[index]) throw new InvalidPathException();

    const entityName = this.model.entities[index].name;
    if (name !== entityName) {
      const associationIndices = [];
      _.forEach(this.model.associations, (association: IAssociation, index) => {
        if (association.source === entityName)
          associationIndices.push({ type: 'source', index });
        if (association.target === entityName)
          associationIndices.push({ type: 'target', index });
      });
      _.forEach(associationIndices, ({ type, index }) => {
        update.push({
          $set: { [`associations.${index}.${type}`]: this.value },
        });
      });
    }
    update.push({ $set: { [this.field]: this.value } });
    return update;
  }
}
