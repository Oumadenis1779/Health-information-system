const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../server');
const Client = require('../models/Client');

const request = supertest(app);

describe('Client API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should register a new client', async () => {
    const res = await request.post('/api/clients/register')
      .set('x-auth-token', 'valid-token')
      .send({
        name: 'John Doe',
        dateOfBirth: '1990-01-01',
        gender: 'Male',
        contact: { email: 'john@example.com' },
      });
    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe('John Doe');
  });
});