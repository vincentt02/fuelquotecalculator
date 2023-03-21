const express = require('express')
const app = express()

const fuelQuote = require('./routes/FuelQuoteModule')
const quoteTable = require('./routes/QuoteTableModule')

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api', fuelQuote, quoteTable)

app.listen(8080, () => {
    console.log("Server started on port 8080")
})