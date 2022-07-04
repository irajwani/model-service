import { IModel } from '../../../Schemas/model.schema';
import { IBaseGenerator } from './Types/base-generator';
import { IsDefined } from 'class-validator';
import { UpdateQuery } from 'mongoose';
import { IStrategy } from './Types/strategy';

export default class BaseGenerator implements IBaseGenerator {
  @IsDefined()
  strategy: IStrategy;

  update: UpdateQuery<IModel>[] = [];

  constructor(strategy: IStrategy) {
    this.strategy = strategy;
    this.generate();
  }

  generate() {
    const result = this.strategy.generateUpdateQuery();
    this.update.push(...result);
  }
}
