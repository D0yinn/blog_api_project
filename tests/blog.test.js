const request = require('supertest');
const app = require('../app');

describe('Blog API Root Endpoint', () => {
  it('should return a welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Blog API is up and running.');
  });
});
