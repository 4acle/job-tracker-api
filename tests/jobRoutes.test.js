const request = require('supertest');
const app = require('../index'); // make sure index.js exports the app

describe('Jobs API', () => {
  it('GET /jobs should return an array', async () => {
    const res = await request(app).get('/jobs');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /jobs should add a job', async () => {
    const newJob = {
      company: 'Tristero',
      title: 'Junior Engineer',
      status: 'applied',
      applied_date: '2025-05-13',
      notes: 'Testing POST'
    };

    const res = await request(app).post('/jobs').send(newJob);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });
});
