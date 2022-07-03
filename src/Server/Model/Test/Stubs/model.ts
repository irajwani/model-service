import EntityStubs from './entity';
import AssociationStubs from './association';
import { IModel } from '../../../../Schemas/model.schema';

interface IModelStubs {
  [index: string]: IModel;
}

const ModelStubs: IModelStubs = {
  S1T1: {
    name: 'Library',
    entities: [EntityStubs.S1T1.Librarian, EntityStubs.S1T1.Bookshelf],
    associations: [AssociationStubs.S1T1.LibrarianToBookshelf],
  },
  S3T1: {
    name: 'Coffee Shop',
    entities: [EntityStubs.S3T1.Librarian, EntityStubs.S3T1.Bookshelf],
    associations: [AssociationStubs.S3T1.BookshelfToLibrarian],
  },
};

export default ModelStubs;
