const supertest = require('supertest');
const express = require('express');
const app = express();
const LoginModuleRouter = require("../routes/LoginModule");
const AuthController = require("../controllers/AuthController");
const { validate } = require('../controllers/AuthController');
const Login = require("../models/Login_register");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config({path: __dirname + '/../../.env'});


app.use(express.json());
app.use("/", LoginModuleRouter);


describe ('POST /', () => {
  //connect to mongoose DB and then disconnect
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  //Username completely missing with password correct.
  it('should return 400 status code and errors array when username is missing', () => {
    const req = { body: { password: 'password123' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    validate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ errors: ['Username is required.'] });
    expect(next).not.toHaveBeenCalled();
  });

  //Username containing spaces with password correct.
  it('should return 400 status code and errors array when username contains spaces', () => {
    const req = { body: { username: 'user name', password: 'password123' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    validate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ errors: ['Username cannot contain spaces.'] });
    expect(next).not.toHaveBeenCalled();
  });

  // Password completely missing when username is present
  it('should return 400 status code and errors array when password is missing', () => {
    const req = { body: { username: 'username' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    validate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ errors: ['Password is required.'] });
    expect(next).not.toHaveBeenCalled();
  });

  //password containing spaces check
  it('should return 400 status code and errors array when password contains spaces', () => {
    const req = { body: { username: 'username', password: 'password 123' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    validate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ errors: ['Password cannot contain spaces.'] });
    expect(next).not.toHaveBeenCalled();
  });

  //Completely valid form test
  it('should call next function when both username and password are valid', () => {
    const req = { body: { username: 'username', password: 'password123' } };
    const res = { status: jest.fn(), json: jest.fn() };
    const next = jest.fn();

    validate(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  //Testing for a valid registration form(user not existing in the database)
  it("should return 200 status code and 'User Registered Successfully' message with token", async () => {
    //Create a mockUser
    const mockUser = {
      username: "Pleasework12",
      password: "Imbegging34"
    };
    //Simulated hashing
    bcrypt.hash = jest.fn().mockImplementation((password, salt, callback) => {
      callback(null, "hashedPassword");
    });

    //We want our findOne function to return nothing.
    Login.findOne = jest.fn().mockResolvedValue(null);

    //Give back mockUser's info
    Login.prototype.save = jest.fn().mockResolvedValue(mockUser);

    //Simulated token
    jwt.sign = jest.fn().mockReturnValue("mockToken");

    //Call register
    const response = await AuthController.register({ body: mockUser }, {}, {});

    //Responses we want
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User Registered Successfully.");
    expect(response.body.token).toBe("mockToken");
  });

  //Testing if a user exists in the Database
  it("should return a 400 status code and 'Username already exists. Please choose a different one.' message", async () => {
    //Create fake user
    const mockUser = {
      username: "ExistingUser123",
      password: "Test1234"
    };
    //Simulated hashing
    bcrypt.hash = jest.fn().mockImplementation((password, salt, callback) => {
      callback(null, "hashedPassword");
    });
  
    //make another "user" with the same details as mockUser to simulate Login.findOne working as intended
    const existingUser = {
      username: "ExistingUser123",
      password: "hashedPassword"
    };
    Login.findOne = jest.fn().mockResolvedValue(existingUser);
  
    //Now we call our register to test Login.FindOnes functionality.
    const response = await AuthController.register({ body: mockUser }, {}, {});
  
    //Responses we want
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Username already exists. Please choose a different one.");
  });
});
