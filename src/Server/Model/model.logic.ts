import * as _ from 'lodash';
import { IPatch } from './Types/patch';
import { QueryGenerators } from './Classes/query-generators';
import { InvalidPathException } from '../../Common/Errors';
import BaseGenerator from './Classes/base-generator';
import { IModel } from '../../Schemas/model.schema';
import { UpdateQuery } from 'mongoose';

export default class ModelLogic {
  public generateUpdateSequence(_id: string, deltas: IPatch[], model: IModel) {
    const updateSequence = [];
    _.forEach(deltas, ({ op, path, value }: IPatch) => {
      const abstractPath = this.generateAbstractPath(path);
      const field = this.generateField(path);
      const targetStrategy = QueryGenerators[op][abstractPath];
      if (!targetStrategy) throw new InvalidPathException();
      const { update } = new BaseGenerator(
        new targetStrategy(field, model, value),
      );
      updateSequence.push(...update);
    });
    const filter = { _id };
    const bulkUpdate = updateSequence.map((update: UpdateQuery<IModel>) => ({
      updateOne: {
        filter,
        update,
      },
    }));
    return bulkUpdate;
  }

  generateAbstractPath(path: string): string {
    return _.join(
      _.split(path, '/').map((component: string, index: number) =>
        this.isSubProperty(component, index)
          ? 'sub-property'
          : index % 2 !== 0
          ? 'n'
          : component,
      ),
      '.',
    );
  }

  private generateField(path: string): string {
    return _.join(_.split(path, '/'), '.');
  }

  private isSubProperty(component: string, index: number): boolean {
    return (
      index > 0 &&
      (component === 'name' ||
        component === 'type' ||
        component === 'source' ||
        component === 'target')
    );
  }
}
