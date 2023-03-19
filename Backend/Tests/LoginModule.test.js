const supertest = require('supertest');
const express = require('express');
const app = express();
const LoginModuleRouter = require("../routes/LoginModule");

app.use(express.json());
app.use("/", LoginModuleRouter);


describe ('POST /', () => {

//Testing for a valid form
it("should return 201 status code and 'Login Successful' message", async () => {
    const response = await supertest(app)
    .post('/')
    .send({username: "Yellow123", password: "Hello1234"});
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Login successful');
    });
}); 


//Testing for an invalid form
/*it("should return a 400 status code and error messages for invalid input", async () => {
    const response = await supertest(app)
    .post('/')
    .send({username: "", password: ""});
    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
        expect.arrayContaining([
            'Username is required',
            'Password is required'
            ])
        );
    });
});*/
