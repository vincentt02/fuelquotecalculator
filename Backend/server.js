const express = require("express");
const app = express();
const PORT = 8080;

const ClientProfileManagementRoute = require("./routes/ClientProfileManagementRouter");
const fuelQuote = require('./routes/FuelQuoteModule')

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api/clientprofilemanagement", ClientProfileManagementRoute);
app.use('/api/fuelquote', fuelQuote)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
