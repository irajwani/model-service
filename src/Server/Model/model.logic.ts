import * as _ from 'lodash';
import { IPatch } from './Types/patch';
import { QueryGenerators } from './Classes/query-generators';
import { InvalidPathException } from '../../Common/Errors';
import BaseGenerator from './Classes/base-generator';

export default class ModelLogic {
  static generateUpdateSequence(deltas, model) {
    const updateSequence = [];
    _.forEach(deltas, function ({ op, path, value }: IPatch) {
      const abstractPath = ModelLogic.generateAbstractPath(path);
      const field = ModelLogic.generateField(path);
      const targetStrategy = QueryGenerators[op][abstractPath];
      if (!targetStrategy) throw new InvalidPathException();
      const { update } = new BaseGenerator(
        new targetStrategy(field, model, value),
      );
      updateSequence.push(...update);
    });
    return updateSequence;
  }

  static generateAbstractPath(path: string): string {
    return _.join(
      _.split(path, '/').map((component: string, index: number) =>
        index === 4 ? 'sub-property' : index % 2 !== 0 ? 'n' : component,
      ),
      '.',
    );
  }

  static generateField(path: string): string {
    return _.join(_.split(path, '/'), '.');
  }
}
