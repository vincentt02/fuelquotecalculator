require("dotenv").config({ path: __dirname + "/../../.env" });
const supertest = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const jwt = require("jsonwebtoken");
const app = express();
const hasClientInformationRoute = require("../routes/hasClientInformation");
const { clientInformation } = require("../models/clientInformation.js");

app.use(express.json());
app.use("/", hasClientInformationRoute);

describe("POST /api/clientprofilemanagement/hci", () => {
    //tokenUser1 has no clientinformation in the database
  const tokenUser1 = jwt.sign(
    {
      username: "testUsername1",
      userId: "testUSERID1",
    },
    process.env.JWT_KEY,
    { expiresIn: "1h" }
  );

    //tokenUser2 has clientinformation in the database
  const tokenUser2 = jwt.sign(
    {
      username: "testUsername2",
      userId: "testUSERID2",
    },
    process.env.JWT_KEY,
    { expiresIn: "1h" }
  );


  beforeAll(async () => {
    mongoDb = await MongoMemoryServer.create();
    const uri = mongoDb.getUri();
    await mongoose.connect(uri);

    await clientInformation.insertMany([{
        userID: "testUSERID2",
        fullName: "test user2",
        addressOne: "123 Main St",
        addressTwo: "",
        city: "Houston",
        state: "Texas",
        zipcode: 12345,
      }]);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoDb.stop();
  });

  describe("given a user that does not have clientinformation in the database", () => {
    it("should return false", async () => {
      const response = await supertest(app).post("/").send({ token: tokenUser1 });
      expect(response.body).toBe(false);
    });
  });

  describe("given a user that has clientinformation in the database", () => {
    it("should return true", async () => {
      const response = await supertest(app).post("/").send({ token: tokenUser2 });
      expect(response.body).toBe(true);
    });
  });
});
