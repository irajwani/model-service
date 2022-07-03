import * as _ from 'lodash';
import { IModel } from '../../../Schemas/model.schema';
import { Operations } from '../Types/patch';
import { IBaseGenerator } from './Types/base-generator';
import { IsDefined, IsEnum } from 'class-validator';
import { TValue } from './Types/value';
import { UpdateQuery } from 'mongoose';
import { IStrategy } from './Types/strategy';

export default abstract class BaseGenerator implements IBaseGenerator {
  @IsDefined()
  @IsEnum(Operations)
  op: Operations;

  @IsDefined()
  path: string;

  pathComponents: string[];

  @IsDefined()
  value: TValue;

  @IsDefined()
  model: IModel;

  type: string;

  field: string;

  update: UpdateQuery<IModel>;

  protected constructor(private strategy: IStrategy) {}

  public setStrategy(strategy: IStrategy) {
    this.strategy = strategy;
  }

  public generatePathComponents(): string[] {
    return _.split(this.path, '/');
  }

  public generateField(): string {
    return _.join(this.generatePathComponents(), '.');
  }
}
