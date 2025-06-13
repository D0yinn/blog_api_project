const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

jest.setTimeout(15000); // Optional: gives MongoDB more time to connect


const baseUrl = '/api/auth';

beforeAll(async () => {
  console.log("MONGO_URI:", process.env.MONGO_URI);
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await User.deleteMany({ email: 'testuser@example.com' }); 
  await mongoose.disconnect();
});

describe('Authentication API', () => {
  test('should register a new user', async () => {
    const res = await request(app).post(`${baseUrl}/signup`).send({
      first_name: 'Test',
      last_name: 'User',
      email: 'testuser@example.com',
      password: 'password123'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('email', 'testuser@example.com');
  });

  test('should login an existing user', async () => {
    const res = await request(app).post(`${baseUrl}/login`).send({
      email: 'testuser@example.com',
      password: 'password123'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('email', 'testuser@example.com');
  });
});
