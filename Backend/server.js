require('dotenv').config({path: '../.env'});

const express = require("express");
const mongoose = require("mongoose");

//importing the routes
const ClientProfileManagementRoute = require("./routes/ClientProfileManagementRouter");
const fuelQuote = require('./routes/FuelQuoteModule')
const quoteTable = require('./routes/QuoteTableModule')
const LoginModuleRoute = require("./routes/LoginModule")
const registerRoute = require('./routes/Register')
const hasClientInformation = require('./routes/hasClientInformation')
const getClientInformation = require('./routes/getClientInformation')

//connect to the database
mongoose.connect(process.env.DATABASE_URI).catch(error => console.log(error));

//creates application variable
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api/clientprofilemanagement", ClientProfileManagementRoute);
app.use("/api/clientprofilemanagement/hci", hasClientInformation);
app.use("/api/getClientInformation", getClientInformation);
app.use('/api', fuelQuote, quoteTable);
app.use("/Login", LoginModuleRoute);
app.use('/Register', registerRoute);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});