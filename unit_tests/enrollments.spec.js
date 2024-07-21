const request = require('supertest');
const app = require('../server.js'); // Your Express app
const Enrollment = require('../modules/enrollments');
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

describe('Enrollments API', () => {

  // Test GET all enrollments
  it('should fetch all enrollments', async () => {
    const response = await request(app).get('/enrollments');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test GET one enrollment
  it('should fetch a single enrollment by ID', async () => {
    const enrollment = new Enrollment({
      description: 'Test Enrollment',
      createdAt: new Date(),
      status: 'Active'
    });
    await enrollment.save();
    
    const response = await request(app).get(`/enrollments/${enrollment._id}`);
    expect(response.status).toBe(200);
    expect(response.body.description).toBe('Test Enrollment');
  });

  // Test POST create enrollment
  it('should create a new enrollment', async () => {
    const response = await request(app)
      .post('/enrollments')
      .send({
        description: 'New Enrollment',
        createdAt: new Date(),
        status: 'Pending'
      });
    expect(response.status).toBe(201);
    expect(response.body.description).toBe('New Enrollment');
  });

  // Test PUT update enrollment
  it('should update an enrollment', async () => {
    const enrollment = new Enrollment({
      description: 'Old Description',
      createdAt: new Date(),
      status: 'Inactive'
    });
    await enrollment.save();

    const response = await request(app)
      .put(`/enrollments/${enrollment._id}`)
      .send({
        description: 'Updated Description',
        createdAt: new Date(),
        status: 'Active'
      });
    expect(response.status).toBe(204);

    const updatedEnrollment = await Enrollment.findById(enrollment._id);
    expect(updatedEnrollment.description).toBe('Updated Description');
  });

  // Test DELETE enrollment
  it('should delete an enrollment', async () => {
    const enrollment = new Enrollment({
      description: 'To Be Deleted',
      createdAt: new Date(),
      status: 'Active'
    });
    await enrollment.save();

    const response = await request(app).delete(`/enrollments/${enrollment._id}`);
    expect(response.status).toBe(200);

    const deletedEnrollment = await Enrollment.findById(enrollment._id);
    expect(deletedEnrollment).toBeNull();
  });

});
