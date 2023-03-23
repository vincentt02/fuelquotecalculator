const supertest = require("supertest");
const express = require("express");
const quoteTable = require("../routes/QuoteTableModule");
const { quoteTableSchema } = require("../controllers/QuoteTableController");
const app = express();

app.use(express.json());
app.use("/", quoteTable);

describe("GET /api/fuel", () => {
  describe("valid quote", () => {
    const validQuote = {
      numG: 10,
      address: "123 Main St",
      date: "03/21/2023",
      price: 50,
      due: 10,
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
      };
    it("should not allow invalid date format", async () => {
      await expect(quoteTableSchema.validate(invalidQuote)).rejects.toThrow(
        /Invalid date format/
      );
    });
  });

  describe("gets quote data for the table", () => {

    it("should receive 200 along with valid quotes", async () => {
      const response = await supertest(app).get("/quotetable/quotedata");
      expect(response.status).toBe(200);
      response.body.forEach(quote => {
        expect(quote).toEqual(expect.objectContaining({ numG: expect.any(Number), address: expect.any(String), date: expect.any(String), price: expect.any(Number), due: expect.any(Number)}))
      })
    });
  });



});