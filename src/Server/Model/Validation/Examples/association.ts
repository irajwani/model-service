import EntitiesMock from './entity';

export default {
  LibrarianToBookshelf: {
    name: 'manages',
    source: EntitiesMock.Librarian.name,
    target: EntitiesMock.Bookshelf.name,
  },
};
