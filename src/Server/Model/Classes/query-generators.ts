import { Operations } from '../Types/patch';
import AddQueryGenerator from './add-generator';

export const QueryGenerators = {
  [Operations.ADD]: AddQueryGenerator,
  // [Operations.DELETE]: DeleteQueryGenerator,
  // [Operations.EDIT]: EditQueryGenerator,
};
