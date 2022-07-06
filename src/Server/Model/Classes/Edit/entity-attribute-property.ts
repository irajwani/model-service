import * as _ from 'lodash';
import { IStrategy } from '../Types/strategy';
import { IModel } from '../../../../Schemas/model.schema';
import { UpdateQuery } from 'mongoose';
import { TValue } from '../Types/value';
import { InvalidPathException } from '../../../../Common/Errors';
import { ValidProperties } from '../Types/valid-resources';
import { IAttribute } from '../../Types/attribute';

export class EditEntityAttributePropertyStrategy implements IStrategy {
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
    const [, index, , subIndex, subProperty] = _.split(this.field, '.');
    const attribute: IAttribute =
      this.model.entities[index].attributes[subIndex];
    if (
      !attribute ||
      (subProperty !== ValidProperties.name &&
        subProperty !== ValidProperties.type)
    )
      throw new InvalidPathException();
    attribute[subProperty] = this.value;
    return [
      {
        $set: {
          [`entities.${index}.attributes.${subIndex}`]: attribute,
        },
      },
    ];
  }
}
