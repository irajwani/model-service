import * as _ from 'lodash';
import { IModel } from '../../../Schemas/model.schema';
import { Operations } from '../Types/patch';
import { IBaseGenerator } from './Types/base-generator';
import { IsDefined, IsEnum } from 'class-validator';
import { TValue } from './Types/value';
import { isInteger } from '../../../Common/utils';
import { UpdateQuery } from 'mongoose';

export default abstract class BaseGenerator implements IBaseGenerator {
  @IsDefined()
  @IsEnum(Operations)
  op: Operations;

  @IsDefined()
  path: string;

  @IsDefined()
  value: TValue;

  @IsDefined()
  model: IModel;

  type: string;

  field: string;

  update: UpdateQuery<IModel>;

  generateField(): string {
    // const pathComponents = _.split(this.path, '/');
    // _.map(pathComponents, (piece, index) => {
    //   if (isInteger(piece)) {
    //     if (pathComponents[index - 1] === 'entities') {
    //       return this.model.entities[index].name;
    //     } else if (pathComponents[index - 1] === 'attributes') {
    //       return;
    //     }
    //   }
    //   return piece;
    // });

    return _.join(_.split(this.path, '/'), '.');
  }
}
