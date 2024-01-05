'use strict';
const request = require('supertest');
const app = require('../app'); // Assuming this is your Express app

describe('Auth API', () => {
  it('should return 201 on successful signup', async () => {
    const res = await request(app)
      .get('/api/auth/signup')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword',
      });

    expect(res.status).to.equal(201);
    expect(res.body.message).to.equal('SignUp Successfully');
    expect(res.body.data.username).to.equal('testuser');
    expect(res.body.data.email).to.equal('test@example.com');
  });

  // Add more integration tests covering different scenarios for signup and login endpoints
});
