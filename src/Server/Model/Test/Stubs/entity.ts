import { IEntity } from '../../Types/entity';

interface ICustomEntity {
  [index: string]: IEntity;
}

interface IEntityStubs {
  [index: string]: ICustomEntity;
}

const EntityStubs: IEntityStubs = {
  S1T1: {
    Librarian: {
      name: 'Librarian',
      attributes: [
        { name: 'name', type: 'string' },
        { name: 'experience', type: 'number' },
      ],
    },
    Bookshelf: {
      name: 'Bookshelf',
      attributes: [
        { name: 'location', type: 'string' },
        { name: 'shelves', type: 'number' },
        { name: 'books', type: 'number' },
      ],
    },
  },
  S3T1: {
    Librarian: {
      name: 'Librarian',
      attributes: [
        { name: 'name', type: 'string' },
        { name: 'experience', type: 'number' },
        { name: 'skill', type: 'number' },
      ],
    },
    Bookshelf: {
      name: 'Bookshelf',
      attributes: [
        { name: 'location', type: 'string' },
        { name: 'books', type: 'number' },
      ],
    },
  },
};

export default EntityStubs;
