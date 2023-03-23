const express = require("express");;
//creates application variable
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//importing the routes
const ClientProfileManagementRoute = require("./routes/ClientProfileManagementRouter");
const fuelQuote = require('./routes/FuelQuoteModule')
const quoteTable = require('./routes/QuoteTableModule')
const LoginModuleRoute = require("./routes/LoginModule")
const registerRoute = require('./routes/Register')


app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use("/api/clientprofilemanagement", ClientProfileManagementRoute);
app.use('/api', fuelQuote, quoteTable)
app.use("/Login", LoginModuleRoute);
app.use('/Register', registerRoute);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});





//our server is listening on this port for requests
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});