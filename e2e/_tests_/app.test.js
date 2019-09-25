const request = require('../request');

describe('book app api', () => {
  
  it('checking if working', () => {
    return request
      .get('/hello')
      expect(200)
      .then(res => {
        expect(res.text).toBe('hello express');
      });
  });

  it('returns a 404 if on a bad path', () => {
    return request
      .get('/1234')
      .expect(404)
      .expect('Content-Type', /text/);
  });

  it('returns application/json 404 on a bad path', () => {
    return request
      .post('/api/1234')
      .expect(404)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.error).toMatch(/not found/i);
      });
  });

});