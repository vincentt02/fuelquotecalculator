const { submitFuelQuote } = require('../controllers/fuelQuoteController');
const request = require('supertest');

describe('valid data', () => {
  const req = {
    body: {
      gallonsRequested: 100,
      dateRequested: '03-19-2023'
    }
  };
  it("it should respond with 200 and 'form received' if the request body is valid", async () => {
    const res = { status: 200, send: {data: "form received"} };
    await submitFuelQuote(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
