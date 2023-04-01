require('dotenv').config({path: __dirname + '/../../.env'});
const supertest = require("supertest");
const express = require("express");
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const jwt = require('jsonwebtoken')
const quoteTable = require("../routes/QuoteTableModule");
const { quoteTableSchema } = require("../controllers/QuoteTableController");
const fuelquoteModel = require("../models/fuelQuote.js");
const app = express();

app.use(express.json());
app.use("/", quoteTable);



describe("GET /api/fuel", () => {

  const token = jwt.sign({
    username: "testUsername",
    userId: "testUSERID"
  },
  process.env.JWT_KEY,
  {expiresIn: '1h'})


  let mongoDb;

  beforeAll(async () => {
    mongoDb = await MongoMemoryServer.create();
    const uri = mongoDb.getUri();
    await mongoose.connect(uri);

    // Insert some mock data
    await fuelquoteModel.insertMany([
      { numG: 10000, address: "555 main st", date: "04/21/2023", price: 1, due: 1, userID: "testUSERID" },
      { numG: 2, address: "555 main st", date: "05/04/2023", price: 1, due: 1, userID: "testUSERID" },
      { numG: 950, address: "555 main st", date: "04/06/2023", price: 1, due: 1, userID: "testUSERID" },
    ]);
    
    // await db.collection('users').insertMany([
    //   { numG: 10000, address: "555 main st", date: "04/21/2023", price: 1, due: 1, userID: "testToken" },
    //   { numG: 2, address: "555 main st", date: "05/04/2023", price: 1, due: 1, userID: "testToken" },
    //   { numG: 950, address: "555 main st", date: "04/06/2023", price: 1, due: 1, userID: "testToken" },
    // ]);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoDb.stop()
  });

  describe("valid quote", () => {
    const validQuote = {
      numG: 10,
      address: "123 Main St",
      date: "03/21/2023",
      price: 50,
      due: 10,
      userID: "testUSERID"
    };
    it("should allow valid quotes", async () => {
      await expect(quoteTableSchema.validate(validQuote)).resolves.toBe(
        validQuote
      );
    });
  });

  describe("invalid quote", () => {
    const invalidQuote = {
      numG: 10,
      date: "03/21/2023",
      price: 50,
      due: 10,
      userID: "testUSERID"
    };
    it("should not allow missing required fields", async () => {
      await expect(quoteTableSchema.validate(invalidQuote)).rejects.toThrow(
        /required/
      );
    });
  });

  describe("invalid quote", () => {
    const invalidQuote = {
      numG: -10,
      address: "123 Main St",
      date: "03/21/2023",
      price: -50,
      due: -10,
      userID: "testUSERID"
    };
    it("should not allow non-positive numbers for numG, price, and due", async () => {
      await expect(quoteTableSchema.validate(invalidQuote)).rejects.toThrow(
        /positive/
      );
    });
  });

  describe("invalid quote", () => {
    const invalidQuote = {
      numG: -10,
      address: "123 Main St",
      date: "03/21/2023",
      price: -50,
      due: -10,
      userID: "testUSERID"
    };
    it("should not allow non-positive numbers for numG, price, and due", async () => {
      await expect(quoteTableSchema.validate(invalidQuote)).rejects.toThrow(
        /positive/
      );
    });
  });

  describe("invalid quote", () => {
    const invalidQuote = {
        numG: 10,
        address: "invalid address",
        date: "03/21/2023",
        price: 50,
        due: 10,
        userID: "testUSERID"
      };
    it("should not allow invalid address format", async () => {
      await expect(quoteTableSchema.validate(invalidQuote)).rejects.toThrow(
        /Invalid address format/
      );
    });
  });

  describe("invalid quote", () => {
    const invalidQuote = {
        numG: 10,
        address: "123 Main Street",
        date: "03/21/23",
        price: 50,
        due: 10,
        userID: "testUSERID"
      };
    it("should not allow invalid date format", async () => {
      await expect(quoteTableSchema.validate(invalidQuote)).rejects.toThrow(
        /Invalid date format/
      );
    });
  });

  describe("gets quote data for the table", () => {

    it("should receive 200 along with valid quotes", async () => {
      const sendToken = await supertest(app).post("/quotetable/quotedata").send({ token: token}) //need to send the user's token first
      const response = await supertest(app).get("/quotetable/quotedata"); //then can get the quotedata
      expect(response.status).toBe(200);
      response.body.forEach(quote => {
        expect(quote).toEqual(expect.objectContaining({ numG: expect.any(Number), address: expect.any(String), date: expect.any(String), price: expect.any(Number), due: expect.any(Number), userID: expect.any(String)}))
      })
    });
  });



});