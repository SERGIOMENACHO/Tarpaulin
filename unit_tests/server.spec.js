const request = require('supertest');
const app = require('../server'); // Adjust the path if necessary

describe('Server', () => {
  
  // Test if the server is running and responding
  it('should respond with 200 on the root route', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  // Test Swagger documentation endpoint
  it('should serve Swagger documentation at /api-docs', async () => {
    const response = await request(app).get('/api-docs');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Swagger UI'); // Adjust based on the actual Swagger documentation content
  });

  // Test CORS headers
  it('should set the correct CORS headers', async () => {
    const response = await request(app).options('/');
    expect(response.headers['access-control-allow-origin']).toBe('*');
    expect(response.headers['access-control-allow-methods']).toContain('GET');
    expect(response.headers['access-control-allow-methods']).toContain('POST');
  });

  // Test a sample API endpoint if you have one
  it('should return a 404 for a non-existent route', async () => {
    const response = await request(app).get('/nonexistent');
    expect(response.status).toBe(404);
  });
});
