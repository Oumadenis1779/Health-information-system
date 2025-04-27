const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../server');
const Program = require('../models/Program');

const request = supertest(app);

describe('Program API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterEach(async () => {
    await Program.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new health program', async () => {
    const res = await request
      .post('/api/programs')
      .set('x-auth-token', 'valid-token')
      .send({
        name: 'TB Treatment',
        description: 'Tuberculosis treatment and monitoring program',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('TB Treatment');
    expect(res.body.data.description).toBe('Tuberculosis treatment and monitoring program');
  });

  it('should fail to create a program with missing name', async () => {
    const res = await request
      .post('/api/programs')
      .set('x-auth-token', 'valid-token')
      .send({
        description: 'Tuberculosis treatment and monitoring program',
      });

    expect(res.status).toBe(500); // Mongoose validation will throw an error
    expect(res.body.success).toBe(false);
  });

  it('should retrieve all programs', async () => {
    // Create a program first
    await Program.create({
      name: 'HIV Care',
      description: 'Comprehensive HIV care and support',
    });

    const res = await request
      .get('/api/programs')
      .set('x-auth-token', 'valid-token');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].name).toBe('HIV Care');
  });

  it('should return empty array when no programs exist', async () => {
    const res = await request
      .get('/api/programs')
      .set('x-auth-token', 'valid-token');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual([]);
  });
});