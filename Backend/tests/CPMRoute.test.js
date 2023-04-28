require('dotenv').config({path: __dirname + '/../../.env'});
const supertest = require("supertest");
const express = require("express");
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const jwt = require('jsonwebtoken')
const app = express();
const ClientProfileManagementRoute = require("../routes/ClientProfileManagementRouter");

app.use(express.json());
app.use("/", ClientProfileManagementRoute);



describe("POST /api/clientprofilemanagement", () => {

  const token = jwt.sign({
    username: "testUsername",
    userId: "testUSERID"
  },
  process.env.JWT_KEY,
  {expiresIn: '1h'})

  beforeAll(async () => {
    mongoDb = await MongoMemoryServer.create();
    const uri = mongoDb.getUri();
    await mongoose.connect(uri);

  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoDb.stop()
  });



  describe("given a valid form", () => {
    const validFormExample = {
    fullName: "John Smith",
      addressOne: "12345 Address St",
      addressTwo: "",
      city: "Houston",
      state: "Texas",
      zipcode: "12345",
      token: token,
    };
    it("should return a 200", async () => {
        const response = await supertest(app).post('/').send(validFormExample);
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject({
            fullName:"John Smith", 
            addressOne: "12345 Address St", 
            city: "Houston", 
            state: "Texas", 
            zipcode: "12345", 
            userID: "testUSERID",
        })
    })
  });


  describe("given a form missing a full name", () => {
    //the form is invalid because it is missing a fullName
    const invalidFormExample = {
      fullName: "",
      addressOne: "12345 Address",
      addressTwo: "",
      city: "Houston",
      state: "Texas",
      zipcode: "12345",
      token: token,
    };
    it("should return a 422 along with an error Full Name Required", async () => {
      const response = await supertest(app).post("/").send(invalidFormExample);
      expect(response.status).toBe(422);
      expect(response.body).toEqual([
        "Full Name Required",
      ])
    });
  });

  describe("given a form with a full name too long", () => {
    //the form is invalid because the fullName is too long
    const invalidFormExample = {
      fullName: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      addressOne: "12345 Address",
      addressTwo: "",
      city: "Houston",
      state: "Texas",
      zipcode: "12345",
      token: token,
    };
    it("should return a 422 along with an error Full Name too long", async () => {
      const response = await supertest(app).post("/").send(invalidFormExample);
      expect(response.status).toBe(422);
      expect(response.body).toEqual([
        "Full Name too long",
      ])
    });
  });

  describe("given a form missing Address 1", () => {
    //the form is invalid because addressOne is missing
    const invalidFormExample = {
      fullName: "John Smith",
      addressOne: "",
      addressTwo: "",
      city: "Houston",
      state: "Texas",
      zipcode: "12345",
      token: token,
    };
    it("should return a 422", async () => {
      const response = await supertest(app).post("/").send(invalidFormExample);
      expect(response.status).toBe(422);
      expect(response.body).toEqual([
        "Address 1 Required",
        "Invalid address format",
      ])
    });
  });

  describe("given a form with a Address 1 too long", () => {
    //the form is invalid because addressOne is too long
    const invalidFormExample = {
      fullName: "John Smith",
      addressOne: "123 aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa st",
      addressTwo: "",
      city: "Houston",
      state: "Texas",
      zipcode: "12345",
      token: token,
    };
    it("should return a 422", async () => {
      const response = await supertest(app).post("/").send(invalidFormExample);
      expect(response.status).toBe(422);
      expect(response.body).toEqual([
        "Address 1 too long",
      ])
    });
  });

  describe("given a form with a Address 2 too long", () => {
    //the form is invalid because addressTwo is too long
    const invalidFormExample = {
      fullName: "John Smith",
      addressOne: "12345 Address",
      addressTwo: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      city: "Houston",
      state: "Texas",
      zipcode: "12345",
      token: token,
    };
    it("should return a 422", async () => {
      const response = await supertest(app).post("/").send(invalidFormExample);
      expect(response.status).toBe(422);
      expect(response.body).toEqual([
        "Address 2 too long",
      ])
    });
  });

  describe("given a form missing a city", () => {
    //the form is invalid because it is missing a city
    const invalidFormExample = {
      fullName: "John Smith",
      addressOne: "12345 Address",
      addressTwo: "",
      city: "",
      state: "Texas",
      zipcode: "12345",
      token: token,
    };
    it("should return a 422", async () => {
      const response = await supertest(app).post("/").send(invalidFormExample);
      expect(response.status).toBe(422);
      expect(response.body).toEqual([
        "City Required",
      ])
    });
  });

  describe("given a form with a city too long", () => {
    //the form is invalid because the city is too long
    const invalidFormExample = {
      fullName: "John Smith",
      addressOne: "12345 Address",
      addressTwo: "",
      city: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      state: "Texas",
      zipcode: "12345",
      token: token,
    };
    it("should return a 422", async () => {
      const response = await supertest(app).post("/").send(invalidFormExample);
      expect(response.status).toBe(422);
      expect(response.body).toEqual([
        "City too long",
      ])
    });
  });

  describe("given a form missing a state", () => {
    //the form is invalid because it is missing a state
    const invalidFormExample = {
      fullName: "John Smith",
      addressOne: "12345 Address St",
      addressTwo: "",
      city: "Houston",
      zipcode: "12345",
      token: token,
    };
    it("should return a 422", async () => {
      const response = await supertest(app).post("/").send(invalidFormExample);
      expect(response.status).toBe(422);
      expect(response.body).toEqual([
        "State Required"
      ])
    });
  });

  describe("given a form with an invalid state", () => {
    //the form is invalid because it is missing a state
    const invalidFormExample = {
      fullName: "John Smith",
      addressOne: "12345 Address St",
      addressTwo: "",
      city: "Houston",
      state: "InvalidState",
      zipcode: "12345",
      token: token,
    };
    it("should return a 422", async () => {
      const response = await supertest(app).post("/").send(invalidFormExample);
      expect(response.status).toBe(422);
      expect(response.body).toEqual([
        "Invalid State",
      ])
    });
  });

  describe("given an invalid form missing a zipcode", () => {
    //the form is invalid because it is missing a Zipcode
    const invalidFormExample = {
      fullName: "John Smith",
      addressOne: "12345 Address St",
      addressTwo: "",
      city: "Houston",
      state: "Texas",
      zipcode: "",
      token: token,
    };
    it("should return a 422", async () => {
      const response = await supertest(app).post("/").send(invalidFormExample);
      expect(response.status).toBe(422);
      expect(response.body).toEqual([
        "Zipcode Required",
        "Zipcode too short"
      ])
    });
  });

  describe("given an invalid form with a zipcode too short", () => {
    //the form is invalid because the zipcode is too short
    const invalidFormExample = {
      fullName: "John Smith",
      addressOne: "12345 Address St",
      addressTwo: "",
      city: "Houston",
      state: "Texas",
      zipcode: "123",
      token: token,
    };
    it("should return a 422", async () => {
      const response = await supertest(app).post("/").send(invalidFormExample);
      expect(response.status).toBe(422);
      expect(response.body).toEqual([
        "Zipcode too short"
      ])
    });
  });

  describe("given an invalid form with a zipcode too long", () => {
    //the form is invalid because the zipcode is too long
    const invalidFormExample = {
      fullName: "John Smith",
      addressOne: "12345 Address St",
      addressTwo: "",
      city: "Houston",
      state: "Texas",
      zipcode: "12345678910",
      token: token,
    };
    it("should return a 422", async () => {
      const response = await supertest(app).post("/").send(invalidFormExample);
      expect(response.status).toBe(422);
      expect(response.body).toEqual([
        "Zipcode too long"
      ])
    });
  });

});
