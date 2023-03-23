const express = require("express");
const app = express();
const PORT = 8080;

const ClientProfileManagementRoute = require("./routes/ClientProfileManagementRouter");
const fuelQuote = require('./routes/FuelQuoteModule')
const quoteTable = require('./routes/QuoteTableModule')
const LoginModuleRoute = require("./routes/LoginModule")


app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api/clientprofilemanagement", ClientProfileManagementRoute);
app.use('/api', fuelQuote, quoteTable)
app.use("/Login", LoginModuleRoute);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});




