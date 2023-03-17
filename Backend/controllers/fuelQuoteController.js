const Yup = require('yup')

// date still needs some work i cant get the validation right
const fuelQuoteSchema = Yup.object({
    gallonsRequested: Yup.number()
        .required("Gallons requested required"),
    dateRequested: Yup.date()
        .required("Delivery Date Required")
})

const getClientData = async (req, res) => {
    // go into database
    // extract client profile data address
    res.status(200).json({ temp: '123 Main St Houston, TX 77001' })
    console.log("Client Address Extracted!");
}


const getSuggestedPrice = async (req, res) => {
    // i'll assume this will be completed in the backend,database
    // and i'll be able to also just extract from db
    res.status(200).json({ temp: '1.50' })
    console.log("Suggested Price Calculated!");
}


const submitFuelQuote = async (req, res) => {
    const fuelQuote = req.body
    
    try {
        fuelQuoteSchema
            .validate(fuelQuote)
        res.status(200).json({ temp: 'fuel quote received' })
        console.log("Valid Form");
        console.log(req.body);
    } catch (error) {
        res.status(400).json({error: error.message})
    }

} 

module.exports = {
    getClientData,
    getSuggestedPrice,
    submitFuelQuote
}