const supertest = require('supertest');
const express = require('express');
const app = express();
const LoginModuleRouter = require("../routes/LoginModule");
const RegisterRouter = require('../routes/Register')
const AuthController = require("../controllers/AuthController");
const { validate } = require('../controllers/AuthController');
const Login = require("../models/Login_register");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config({path: __dirname + '/../../.env'});


app.use(express.json());
app.use("/", RegisterRouter);


describe ('POST /', () => {
  //connect to mongoose DB and then disconnect
  beforeAll(async () => {
    mongoDb = await MongoMemoryServer.create();
    const uri = mongoDb.getUri();
    await mongoose.connect(uri);
    // Registering a test user
    const registerTestUser = await supertest(app)
    .post('/')
    .send( { username: 'test2', password: '123456' } );
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoDb.stop()
  });

  //   // Testing for an invalid form
  it("should return a 400 status code and error messages for invalid input", async () => {
    const response = await supertest(app)
      .post('/')
      .send({username: "", password: ""});
    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        'Username is required.',
        'Password is required.'
      ])
    );
  });

  it("should return a 400 status code and error messages for invalid input", async () => {
    const response = await supertest(app)
      .post('/')
      .send({username: "bob dylan", password: "bob dylans password"});
    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        'Username cannot contain spaces.',
        'Password cannot contain spaces.'
      ])
    );
  });

  //Testing for a valid registration form(user not existing in the database)
  it("should return 200 status code and 'User Registered Successfully'", async () => {
    const res = await supertest(app)
    .post('/')
    .send( { username: 'airplane1', password: '1234' } );
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('User Registered Successfully.')
    expect(res.body.token).toBeDefined()
  });

  it("should return a 400 status code and 'Username already exists. Please choose a different one.' message", async () => {
    const res = await supertest(app)
    .post('/')
    .send( { username: 'test2', password: '123456' });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Username already exists. Please choose a different one.')
  });
});
