export default [
  {
    op: 'add',
    path: 'associations',
    value: { name: 'managedBy', source: 'Bookshelf', target: 'Librarian' },
  },
  {
    op: 'add',
    path: 'entities/0/attributes',
    value: { name: 'skill', type: 'number' },
  },
  { op: 'delete', path: 'associations/1' },
  { op: 'edit', path: 'name', value: 'Coffee Time Now' },
  { op: 'delete', path: 'entities/1/attributes/1' },
];
