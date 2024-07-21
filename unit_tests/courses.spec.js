const request = require('supertest');
const app = require('../server.js'); // Your Express app
const Course = require('../modules/courses');
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

describe('Courses API', () => {

  // Test GET all courses
  it('should fetch all courses', async () => {
    const response = await request(app).get('/courses');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test GET one course
  it('should fetch a single course by ID', async () => {
    const course = new Course({
      title: 'Test Course',
      description: 'Test Description',
      isComplete: false
    });
    await course.save();
    
    const response = await request(app).get(`/courses/${course._id}`);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Test Course');
  });

  // Test POST create course
  it('should create a new course', async () => {
    const response = await request(app)
      .post('/courses')
      .send({
        title: 'New Course',
        description: 'New Description',
        isComplete: false
      });
    expect(response.status).toBe(201);
    expect(response.body.title).toBe('New Course');
  });

  // Test PUT update course
  it('should update a course', async () => {
    const course = new Course({
      title: 'Old Title',
      description: 'Old Description',
      isComplete: false
    });
    await course.save();

    const response = await request(app)
      .put(`/courses/${course._id}`)
      .send({
        title: 'Updated Title',
        description: 'Updated Description',
        isComplete: true
      });
    expect(response.status).toBe(204);

    const updatedCourse = await Course.findById(course._id);
    expect(updatedCourse.title).toBe('Updated Title');
  });

  // Test DELETE course
  it('should delete a course', async () => {
    const course = new Course({
      title: 'Delete Me',
      description: 'Delete Description',
      isComplete: false
    });
    await course.save();

    const response = await request(app).delete(`/courses/${course._id}`);
    expect(response.status).toBe(200);

    const deletedCourse = await Course.findById(course._id);
    expect(deletedCourse).toBeNull();
  });

});
