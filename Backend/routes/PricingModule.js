const { clientInformation } = require("../models/clientInformation.js");
const fuelQuote = require("../models/fuelQuote.js");

class pricingModule {

    constructor(req, userID) {
        this.suggestedPPG = null;
        this.userID = userID;
        this.gallonsRequested = req.gallonsRequested;
    }

    getLocationFactor = async () => {
        const query = { userID: this.userID };
        const client = await clientInformation.findOne(query);
        if (client && client.state == "Texas") {
            return 0.02;
        } else {
            return 0.04;
        }
    }

    getRateHistoryFactor = async () => {
        const query =  { userID: this.userID };
        const prevQuote = await fuelQuote.find(query);
        if (prevQuote.length != 0) {
            return 0.01;
        } else {
            return 0.0;
        }
    }

    getGallonsReqFactor = () => {
        if(this.gallonsRequested > 1000)
            return 0.02
        return 0.03
    }
    
    suggestedPrice = async () => {
        //function that uses the objects parameters to return the suggested price per gallon.
        const companyProfitFactor = 0.10;
        const crudeOilPrice = 1.50; 
        const locationFactor = await this.getLocationFactor();
        const rateHistoryFactor = await this.getRateHistoryFactor();
        const gallonsReqFactor = this.getGallonsReqFactor();

        // Margin =  Current Price * (Location Factor - Rate History Factor + Gallons Requested Factor + Company Profit Factor)
        const margin = crudeOilPrice * (locationFactor - rateHistoryFactor + gallonsReqFactor + companyProfitFactor);

        //calculate suggestedPPG using locationFactor, rateHistoryFactor, gallonsReqFactor, companyProfitFactor, and crudeOilPrice
        let suggestedPPG = crudeOilPrice + margin;

        return suggestedPPG;
    }
}

module.exports = pricingModule;