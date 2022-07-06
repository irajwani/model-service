import * as _ from 'lodash';
import { IStrategy } from '../Types/strategy';
import { IModel } from '../../../../Schemas/model.schema';
import { UpdateQuery } from 'mongoose';
import { TValue } from '../Types/value';
import { InvalidAssociationException } from '../../../../Common/Errors';
import { ValidProperties } from '../Types/valid-resources';
import { IEntity } from '../../Types/entity';

export class EditAssociationPropertyStrategy implements IStrategy {
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
    const update: UpdateQuery<IModel>[] = [];
    const [, index, subProperty] = _.split(this.field, '.');
    const { source, target } = this.model.associations[index];
    if (
      subProperty === ValidProperties.source ||
      subProperty === ValidProperties.target
    ) {
      if (
        !this.model.entities.find((entity) => entity.name === this.value) ||
        (subProperty === ValidProperties.source && this.value === source) ||
        (subProperty === ValidProperties.target && this.value === target)
      )
        throw new InvalidAssociationException();

      const entityIndices: number[] = [];
      _.forEach(this.model.entities, (entity: IEntity, index) => {
        if (entity.name === this.value) entityIndices.push(index);
      });
      _.forEach(entityIndices, (index) => {
        update.push({
          $set: { [`entities.${index}.name`]: this.value },
        });
      });
    }

    update.push({ $set: { [this.field]: this.value } });
    return update;
  }
}
