const express = require('express');
const supertest = require('supertest');
require('dotenv').config({path: __dirname + '/../../.env'});
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = express();

const LoginModuleRouter = require("../routes/LoginModule");
const RegisterRouter = require('../routes/Register')

app.use(express.json());
app.use("/", LoginModuleRouter);
app.use("/register", RegisterRouter);


describe ('POST /', () => {

  //connect to mongoose DB and then disconnect
  beforeAll(async () => {
    mongoDb = await MongoMemoryServer.create();
    const uri = mongoDb.getUri();
    await mongoose.connect(uri);
    // Registering a test user
    const registerTestUser = await supertest(app)
    .post('/register')
    .send( { username: 'ecolijahTest', password: '55555' } );
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoDb.stop()
  });
  
  

   // Testing for an invalid form
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

  //testing for user not found, valid forms
  it("should return a 400 status code and error messages for user not found", async () => {
    const response = await supertest(app)
      .post('/')
      .send({username: "nonExistentUser", password: "doesntmatter"});
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("User not found.")
      
    });
  

  //testing for user found, and token sent
  it('should return a 200 status code and token when given a valid username and password', async () => {
    const response = await supertest(app)
      .post('/')
      .send({ username: 'ecolijahTest', password: '55555' })
    expect(response.status).toBe(200)
    expect(response.body.message).toEqual('Authentication successful.')
    expect(response.body.token).toBeDefined()
    
  });
  //testing for user found, incorrect password
  it('should return a 401 status code and error: Authentication failed. Password is incorrect.', async () => {
    const response = await supertest(app)
      .post('/')
      .send({ username: 'ecolijahTest', password: '12345' })
    expect(response.status).toBe(401)
    expect(response.body.message).toEqual('Authentication failed. Password is incorrect.')
    
  });
});

