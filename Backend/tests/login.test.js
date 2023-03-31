const express = require('express');
const supertest = require('supertest');
require('dotenv').config({path: '../../env'});
const mongoose = require('mongoose');
const app = express();

const LoginModuleRouter = require("../routes/LoginModule");

app.use(express.json());
app.use("/", LoginModuleRouter);

const DB_URI = "mongodb+srv://elijahlopez:haMNSPrFoCj8nq8T@fuelquotedatabase.blessbs.mongodb.net/FQDatabase?retryWrites=true&w=majority";

describe ('POST /', () => {

  //connect to mongoose DB and then disconnect
  beforeAll(async () => {
    await mongoose.connect(DB_URI, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
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
      
    })
  });


// describe('POST /', () => {
//   it('should return a 400 status code when given an invalid username or password', async () => {
//     const response = await supertest(app)
//       .post('/')
//       .send({ username: 'invalidUsername', password: 'invalidPassword' })
//     expect(response.status).toBe(400)
//     expect(response.body.message).toEqual('Authentication failed. Password is incorrect.')
//   })
  //testing for user found, and token sent
  it('should return a 200 status code and token when given a valid username and password', async () => {
    const response = await supertest(app)
      .post('/')
      .send({ username: 'testuser', password: '$2a$10$dvb7VQHRAzDfvmwUNtPkfumTvnKoC5W/4vyURsgNbk3dNd96wi8ne' })
    expect(response.status).toBe(200)
    expect(response.body.message).toEqual('Authentication successful.')
    expect(response.body.token).toBeDefined()
  });

