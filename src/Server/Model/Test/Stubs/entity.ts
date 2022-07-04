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
  S1T2: {
    Person: {
      name: 'Person',
      attributes: [
        { name: 'name', type: 'string' },
        { name: 'hairColor', type: 'string' },
      ],
    },
    Company: {
      name: 'Company',
      attributes: [
        { name: 'name', type: 'string' },
        { name: 'country', type: 'string' },
      ],
    },
    Website: {
      name: 'Website',
      attributes: [
        { name: 'name', type: 'string' },
        { name: 'url', type: 'string' },
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
  S3T2: {
    Website: {
      name: 'Website',
      attributes: [
        { name: 'main page', type: 'string' },
        { name: 'url', type: 'string' },
      ],
    },
  },
};

export default EntityStubs;
