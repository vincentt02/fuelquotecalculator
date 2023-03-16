const express = require('express')
const app = express()

const fuelQuote = require('./routes/FuelQuoteModule')

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/fuelquote', fuelQuote)

app.listen(8080, () => {
    console.log("Server started on port 8080")
})