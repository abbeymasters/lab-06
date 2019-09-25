const request = require('../request');
const db = require('../db');

describe('books api', () => {
  
  beforeEach(() => {
    return db.dropCollection('books');
  });

  const americanah = {
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

  function postBook(book) {
    return request 
      .post('/api/book')
      .send(book)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts a book', () => {
    return postBook(americanah)
      .then(book => {
        expect(book).toEqual({
          _id: expect.any(String),
          __v: 0,
          ...americanah
        });
      });
  }); 

  it('gets a book id', () => {
    return postBook(americanah)
      .then(book => {
        return request.get(`/api/book/${book._id}`)
          .expect(200)
          .then(({ body }) => {
            expect(body).toEqual(book);
          });
      });
  });

  it('gets a list of books', () => {
    return Promise.all([
      postBook({
        name: 'hello',
        author: 'new one',
        available: true,
        yearPublished: 2013,
        howMany: 5,
        genre: ['fiction'],
        appearances: {
          pattern: 'solid',
          mainColor: 'white'
        }
      }),
      postBook({
        name: 'diff book',
        author: 'abbey masters',
        available: true,
        yearPublished: 2013,
        howMany: 5,
        genre: ['fiction'],
        appearances: {
          pattern: 'solid',
          mainColor: 'blue'
        }
      }),
      postBook({
        name: 'harry potter # 10',
        author: 'JK Rowling',
        available: true,
        yearPublished: 2010,
        howMany: 5,
        genre: ['romance'],
        appearances: {
          pattern: 'solid',
          mainColor: 'green'
        }
      }),
    ])
      .then(() => {
        return request.get('/api/book')
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(3);
      });
  });

  it('updates a book', () => {
    return postBook(americanah)
      .then(book => {
        book.author = 'abbey m';
        return request
          .put(`/api/book/${book._id}`)
          .send(book)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.author).toBe('abbey m');
      });
  });

  it('deletes a book', () => {
    return postBook(americanah)
      .then(book => {
        return request
          .delete(`/api/book/${book._id}`)
          .expect(200);
      });
  });

});