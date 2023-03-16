const Client = require('../models/workoutModel')
const Yup = require('yup')

const fuelQuoteSchema = Yup.object({
    gallonsRequested: Yup.number()
        .required("Gallons requested required")
})

const getClientData = async (req, res) => {
    // go into database
    // extract client profile data address
    res.status(200).json({ temp: '123 Main St Houston, TX 77001' })
}


const getSuggestedPrice = async (req, res) => {
    // i'll assume this will be completed in the backend,database
    // and i'll be able to also just extract from db
    res.status(200).json({ temp: '1.50' })
}


const submitFuelQuote = async (req, res) => {
    const { gallonsRequested, dateRequested } = req.body

    
    try {

    } catch (error) {
        res.status(400).json({error: error.message})
    }

} 

module.exports = {
    getClientData,
    getSuggestedPrice,
    submitFuelQuote
}