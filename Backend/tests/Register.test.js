const express = require('express');
const supertest = require('supertest');
const app = express();
const registerRouter = require('../routes/Register'); 

// Set up the test environment, seperate express app
app.use(express.json());
app.use('/', registerRouter); // add the router we imported to the app

describe('POST /', () => {

    //test 1
  it('should return 201 status code and "Registration successful" message for valid input', async () => {
    const res = await supertest(app)
      .post('/')
      .send({ username: 'john_doe', password: 'password123' });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Registration successful');
  });

    //test 2

  it('should return 400 status code and error messages for invalid input', async () => {
    const res = await supertest(app)
      .post('/')
      .send({ username: '', password: ' ' });
    expect(res.status).toBe(400);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        'Username is required.',
        'Password is required.',
        'Password cannot contain spaces.'
      ])
    );
  });

    //test 3

  it('should return 400 status code and error messages for invalid input', async () => {
    const res = await supertest(app)
      .post('/')
      .send({ username: 'john doe', password: '1234' });
    expect(res.status).toBe(400);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        'Username cannot contain spaces.'
      ])
    );
  });
});
