const request = require('supertest');
const app = require('../server.js'); // Your Express app
const Lesson = require('../modules/lessons');
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

describe('Lessons API', () => {

  // Test GET all lessons
  it('should fetch all lessons', async () => {
    const response = await request(app).get('/lessons');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test GET one lesson
  it('should fetch a single lesson by ID', async () => {
    const lesson = new Lesson({
      courseId: '12345',
      title: 'Sample Lesson',
      content: 'Sample Content',
      createdAt: new Date()
    });
    await lesson.save();
    
    const response = await request(app).get(`/lessons/${lesson._id}`);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Sample Lesson');
  });

  // Test POST create lesson
  it('should create a new lesson', async () => {
    const response = await request(app)
      .post('/lessons')
      .send({
        courseId: '12345',
        title: 'New Lesson',
        content: 'New Content',
        createdAt: new Date()
      });
    expect(response.status).toBe(201);
    expect(response.body.title).toBe('New Lesson');
  });

  // Test PUT update lesson
  it('should update a lesson', async () => {
    const lesson = new Lesson({
      courseId: '12345',
      title: 'Old Title',
      content: 'Old Content',
      createdAt: new Date()
    });
    await lesson.save();

    const response = await request(app)
      .put(`/lessons/${lesson._id}`)
      .send({
        courseId: '12345',
        title: 'Updated Title',
        content: 'Updated Content',
        createdAt: new Date()
      });
    expect(response.status).toBe(204);

    const updatedLesson = await Lesson.findById(lesson._id);
    expect(updatedLesson.title).toBe('Updated Title');
  });

  // Test DELETE lesson
  it('should delete a lesson', async () => {
    const lesson = new Lesson({
      courseId: '12345',
      title: 'To Be Deleted',
      content: 'To Be Deleted Content',
      createdAt: new Date()
    });
    await lesson.save();

    const response = await request(app).delete(`/lessons/${lesson._id}`);
    expect(response.status).toBe(200);

    const deletedLesson = await Lesson.findById(lesson._id);
    expect(deletedLesson).toBeNull();
  });

});
