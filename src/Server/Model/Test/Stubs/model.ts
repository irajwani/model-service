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
  S1T2: {
    name: 'MyFirstModel',
    entities: [
      EntityStubs.S1T2.Person,
      EntityStubs.S1T2.Company,
      EntityStubs.S1T2.Website,
    ],
    associations: [
      AssociationStubs.S1T2.worksFor,
      AssociationStubs.S1T2.hasSite,
    ],
  },
  S3T1: {
    name: 'Coffee Shop',
    entities: [EntityStubs.S3T1.Librarian, EntityStubs.S3T1.Bookshelf],
    associations: [AssociationStubs.S3T1.BookshelfToLibrarian],
  },
  S3T2: {
    name: 'MyFirstModel',
    entities: [EntityStubs.S1T2.Person, EntityStubs.S3T2.Website],
    associations: [AssociationStubs.S1T2.hasSite],
  },
};

export default ModelStubs;
