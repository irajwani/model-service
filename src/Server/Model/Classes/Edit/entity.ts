import * as _ from 'lodash';
import { IStrategy } from '../Types/strategy';
import { IModel } from '../../../../Schemas/model.schema';
import { UpdateQuery } from 'mongoose';
import { TValue } from '../Types/value';
import { IEntity } from '../../Types/entity';
import { InvalidPathException } from '../../../../Common/Errors';
import { ValidResources } from '../Types/valid-resources';
import { IAssociation } from '../../Types/association';

export class EditEntityStrategy implements IStrategy {
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
    const update: UpdateQuery<IModel>[] = [];
    const entity = this.value as IEntity;
    if (!this.model.entities[index]) throw new InvalidPathException();

    const entityName = this.model.entities[index].name;
    if (entity.name !== entityName) {
      const associationIndices = [];
      _.forEach(this.model.associations, (association: IAssociation, index) => {
        if (association.source === entity.name)
          associationIndices.push({ type: 'source', index });
        if (association.target === entity.name)
          associationIndices.push({ type: 'target', index });
      });
      _.forEach(associationIndices, ({ type, index }) => {
        update.push({
          $set: { [`associations.${index}.${type}`]: entity.name },
        });
      });
    }
    update.push({ $set: { [this.field]: this.value } });
    return update;
  }
}
