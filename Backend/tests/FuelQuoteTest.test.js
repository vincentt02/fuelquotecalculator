const supertest = require("supertest");
const express = require("express");
const app = express();
const fuelQuote = require("../routes/FuelQuoteModule");

app.use(express.json());
app.use("/", fuelQuote);

describe("POST /api/fuelquote", () => {
  describe("given a valid form", () => {
    const req = {
      gallonsRequested: 100,
      dateRequested: "03/25/2023",
    };
    it("should return a 200", async () => {
      const response = await supertest(app).post("/fuelquote").send(req);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        data: "form received",
      });
    });
  });

  describe("given an invalid form with missing dateRequested", () => {
    const req = {
      gallonsRequested: 100,
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
      dateRequested: 200
    };
    it("should return a 422", async () => {
      const response = await supertest(app).post("/fuelquote").send(req);
      expect(response.status).toBe(422);
      expect(response.body).toEqual(["Invalid date format, please use MM/DD/YYYY"]);
    });
  });
});
