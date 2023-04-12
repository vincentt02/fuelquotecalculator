require("dotenv").config({ path: __dirname + "/../../.env" });
const supertest = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const jwt = require("jsonwebtoken");
const app = express();
const fuelQuote = require("../routes/FuelQuoteModule");
const fuelquoteModel = require("../models/fuelQuote.js");
const { clientInformation } = require("../models/clientInformation.js");

app.use(express.json());
app.use("/", fuelQuote);

describe("non texas resident", () => {
  beforeAll(async () => {
    mongoDb = await MongoMemoryServer.create();
    const uri = mongoDb.getUri();
    await mongoose.connect(uri);

    // Insert some mock data
    await clientInformation.insertMany([{
      userID: "testUSERID",
      fullName: "test user",
      addressOne: "123 Bruh St",
      addressTwo: "",
      city: "Albany",
      state: "New York",
      zipcode: 12345,
    }]);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoDb.stop();
  });

  describe("given a client with no address data in their profile", () => {
    it("should return a 422", async () => {
      const response = await supertest(app).get("/fuelquote/clientdata");
      expect(response.status).toBe(422);
      expect(response.body).toEqual(["Client has no address"]);
    });
  });

  describe("gets the suggested price, for non texas under 1000 gallons", () => {
    const req = {
      gallonsRequested: 100,
      dateRequested: "04/30/2023",
    };
    it("should return a 200 along with the suggested price", async () => {
      const response = await supertest(app).post("/fuelquote/suggestedprice").send(req);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ suggestedPrice: expect.any(Number) });
    });
  });

  describe("gets the suggested price, non texas over 1000 gallons", () => {
    const req = {
      gallonsRequested: 1200,
      dateRequested: "04/30/2023",
    };
    it("should return a 200 along with the suggested price", async () => {
      const response = await supertest(app).post("/fuelquote/suggestedprice").send(req);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ suggestedPrice: expect.any(Number) });
    });
  });
});

describe("POST /api/fuelquote", () => {
  const token = jwt.sign(
    {
      username: "testUsername",
      userId: "testUSERID",
    },
    process.env.JWT_KEY,
    { expiresIn: "1h" }
  );

  beforeAll(async () => {
    mongoDb = await MongoMemoryServer.create();
    const uri = mongoDb.getUri();
    await mongoose.connect(uri);

    // Insert some mock data
    await clientInformation.create({
      userID: "testUSERID",
      fullName: "test user",
      addressOne: "121 testaddress",
      addressTwo: "",
      city: "Houston",
      state: "Texas",
      zipcode: 12345,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoDb.stop();
  });

  describe("given a valid form", () => {
    const req = {
      gallonsRequested: 100,
      dateRequested: "03/25/2023",
      address: "121 testaddress",
      token: token,
    };
    it("should return a 200", async () => {
      const response = await supertest(app).post("/fuelquote").send(req);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          numG: expect.any(Number),
          address: expect.any(String),
          date: expect.any(String),
          price: expect.any(Number),
          due: expect.any(Number),
          userID: expect.any(String),
        })
      );
    });
  });

  describe("gets the client address", () => {
    it("should return a 200 along with the client address", async () => {
      const sendClientToken = await supertest(app)
        .post("/fuelquote/token")
        .send({ token: token }); //first have to send token
      const response = await supertest(app).get("/fuelquote/clientdata"); //then can get the client address
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ clientAddress: expect.any(String) });
    });
  });

  describe("gets the suggested price", () => {
    const req = {
      gallonsRequested: 100,
      dateRequested: "04/30/2023",
      token: token,
    };
    it("should return a 200 along with the suggested price", async () => {
      const response = (await supertest(app).post("/fuelquote/suggestedprice").send(req));
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ suggestedPrice: expect.any(Number) });
    });
  });

  describe("given an invalid form with missing dateRequested", () => {
    const req = {
      gallonsRequested: 100,
      token: token,
    };
    it("should return a 422", async () => {
      const response = await supertest(app).post("/fuelquote").send(req);
      expect(response.status).toBe(422);
      expect(response.body).toEqual(["Delivery Date Required"]);
    });
  });

  describe("given an invalid form with missing gallonsRequested", () => {
    const req = {
      dateRequested: "03/23/2023",
      token: token,
    };
    it("should return a 422", async () => {
      const response = await supertest(app).post("/fuelquote").send(req);
      expect(response.status).toBe(422);
      expect(response.body).toEqual(["Gallons requested required"]);
    });
  });

  describe("given an invalid form with invalid gallonsRequested", () => {
    const req = {
      gallonsRequested: -1,
      dateRequested: "03/23/2023",
      token: token,
    };
    it("should return a 422", async () => {
      const response = await supertest(app).post("/fuelquote").send(req);
      expect(response.status).toBe(422);
      expect(response.body).toEqual([
        "Gallons requested must be greater than 0",
      ]);
    });
  });

  describe("given an invalid form with invalid dateRequested", () => {
    const req = {
      gallonsRequested: 55,
      dateRequested: "13/2/2023",
      token: token,
    };
    it("should return a 422", async () => {
      const response = await supertest(app).post("/fuelquote").send(req);
      expect(response.status).toBe(422);
      expect(response.body).toEqual([
        "Invalid date format, please use MM/DD/YYYY",
      ]);
    });
  });

  describe("given an invalid form with invalid field values", () => {
    const req = {
      gallonsRequested: -100,
      dateRequested: "03/23/2",
      token: token,
    };
    it("should return a 422", async () => {
      const response = await supertest(app).post("/fuelquote").send(req);
      expect(response.status).toBe(422);
      expect(response.body).toEqual([
        "Gallons requested must be greater than 0",
        "Invalid date format, please use MM/DD/YYYY",
      ]);
    });
  });

  describe("given an invalid form with NaN gallonsRequested", () => {
    const req = {
      gallonsRequested: "one hundred gallons",
      dateRequested: "03/23/2023",
      token: token,
    };
    it("should return a 422", async () => {
      const response = await supertest(app).post("/fuelquote").send(req);
      expect(response.status).toBe(422);
      expect(response.body).toEqual(["gallonsRequested must be a number"]);
    });
  });

  describe("given an invalid form with NaN gallonsRequested and invalid date", () => {
    const req = {
      gallonsRequested: "one hundred gallons",
      dateRequested: "03/23/23",
      token: token,
    };
    it("should return a 422", async () => {
      const response = await supertest(app).post("/fuelquote").send(req);
      expect(response.status).toBe(422);
      expect(response.body).toEqual([
        "gallonsRequested must be a number",
        "Invalid date format, please use MM/DD/YYYY",
      ]);
    });
  });

  describe("given an invalid form with nonstring date", () => {
    const req = {
      gallonsRequested: 100,
      dateRequested: 200,
      token: token,
    };
    it("should return a 422", async () => {
      const response = await supertest(app).post("/fuelquote").send(req);
      expect(response.status).toBe(422);
      expect(response.body).toEqual([
        "Invalid date format, please use MM/DD/YYYY",
      ]);
    });
  });

  describe("given an invalid form missing a token", () => {
    const req = {
      gallonsRequested: 100,
      dateRequested: "03/23/2023",
    };
    it("should return a 422", async () => {
      const response = await supertest(app).post("/fuelquote").send(req);
      expect(response.status).toBe(422);
      expect(response.body).toEqual(["Missing token"]);
    });
  });
});
