import { IPatch, Operations } from '../../Types/patch';
import { UpdateModelDto } from '../../Validation/update-model.dto';

interface DeltasStub {
  [index: string]: UpdateModelDto;
}

const DeltasStub: DeltasStub = {
  S1T1: {
    deltas: [
      {
        op: Operations.ADD,
        path: 'associations',
        value: { name: 'arrangedBy', source: 'Bookshelf', target: 'Librarian' },
      },
      {
        op: Operations.ADD,
        path: 'entities/0/attributes',
        value: { name: 'skill', type: 'number' },
      },
      { op: Operations.DELETE, path: 'associations/0' },
      { op: Operations.EDIT, path: 'name', value: 'Coffee Shop' },
      { op: Operations.DELETE, path: 'entities/1/attributes/1' },
    ],
  },
};

export default DeltasStub;
