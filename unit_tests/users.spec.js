const request = require('supertest');
const app = require('../server.js'); // Your Express app
const User = require('../modules/users');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

beforeAll(async () => {
  // Connect to the test database
  await mongoose.connect('mongodb://localhost:27017/test_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  // Clean up and close the connection
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('User API', () => {

  // Test POST create user
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
        role: 'student',
        gender: 'female'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name', 'Test User');
    expect(response.body).toHaveProperty('email', 'testuser@example.com');
    expect(response.body).not.toHaveProperty('password'); // Ensure password is not returned in response

    // Verify that the password is hashed and stored correctly
    const user = await User.findById(response.body._id);
    expect(user).toBeTruthy();
    const isPasswordCorrect = await bcrypt.compare('password123', user.password);
    expect(isPasswordCorrect).toBe(true);
  });

});
