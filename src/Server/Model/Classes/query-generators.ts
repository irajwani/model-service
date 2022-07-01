import { Operations } from '../Types/patch';
import AddQueryGenerator from './add-generator';
import DeleteQueryGenerator from './delete-generator';
import EditQueryGenerator from './edit-generator';

export const QueryGenerators = {
  [Operations.ADD]: AddQueryGenerator,
  [Operations.DELETE]: DeleteQueryGenerator,
  [Operations.EDIT]: EditQueryGenerator,
};
