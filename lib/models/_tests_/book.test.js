const Book = require('../book');
const mongoose = require('mongoose');

describe('Book model', () => {

  it('valid model all properties', () => {
    const data = {
      name: 'americanah',
      author: 'chimamanda ngozi adichie',
      available: true,
      yearPublished: 2013,
      howMany: 5,
      genre: ['fiction'],
      appearances: {
        pattern: 'solid',
        mainColor: 'white'
      }
    };

    const book = new Book(data);
    const errors = book.validateSync();
    expect(errors).toBeUndefined;

    const json = book.toJSON();

    expect(json).toEqual({
      ...data,
      _id: expect.any(Object),
    });
  });

  it('validates required properties', () => {
    const data = {};
    const book = new Book(data);

    const { errors } = book.validateSync();
    expect(errors.name.kind).toBe('required');
    expect(errors.author.kind).toBe('required');
    expect(errors.yearPublished.kind).toBe('required');
    expect(errors['appearances.mainColor'].kind).toBe('required');
    expect(errors.howMany.kind).toBe('required');
  });

  it('populates default properties', () => {
    const data = {
      name: 'americanah',
      author: 'chimamanda ngozi adichie',
      available: false,
      yearPublished: 2013,
      howMany: 5,
      genre: ['fiction'],
      appearances: {
        pattern: 'solid',
        mainColor: 'white'
      }
    };

    const book = new Book(data);
    const err = book.validateSync();
    expect(err).toBeUndefined();

    expect(book.available).toBe(false);

  });

  it('checks max of 9 books', () => {
    const data = {
      howMany: 10
    };

    const book = new Book(data);
    const { errors } = book.validateSync();
    expect(errors.howMany.kind).toBe('max');
  });

  it('enforces min of 1 book', () => {
    const data = {
      howMany: -10
    };

    const book = new Book(data);
    const { errors } = book.validateSync();
    expect(errors.howMany.kind).toBe('min');
  });

  it('enforces enum on genre', () => {
    const data = {
      genre: ['funky']
    };
    const book = new Book(data);
    const { errors } = book.validateSync()
    expect(errors['genre.0'].kind).toBe('enum');
  });

})