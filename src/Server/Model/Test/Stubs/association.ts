import EntityStubs from './entity';
import { IEntity } from '../../Types/entity';
import { IAssociation } from '../../Types/association';

interface ICustomAssociation {
  [index: string]: IAssociation;
}

interface IAssociationStubs {
  [index: string]: ICustomAssociation;
}

const AssociationStubs: IAssociationStubs = {
  S1T1: {
    LibrarianToBookshelf: {
      name: 'arranges',
      source: EntityStubs.S1T1.Librarian.name,
      target: EntityStubs.S1T1.Bookshelf.name,
    },
  },
  S1T2: {
    worksFor: {
      name: 'worksFor',
      source: EntityStubs.S1T2.Person.name,
      target: EntityStubs.S1T2.Company.name,
    },
    hasSite: {
      name: 'hasSite',
      source: EntityStubs.S1T2.Person.name,
      target: EntityStubs.S1T2.Website.name,
    },
  },
  S3T1: {
    BookshelfToLibrarian: {
      name: 'arrangedBy',
      source: 'Bookshelf',
      target: 'Librarian',
    },
  },
};

export default AssociationStubs;
