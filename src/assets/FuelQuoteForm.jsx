import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";

import "../css/FuelQuoteForm.css"
import "react-datepicker/dist/react-datepicker.css";


const FuelDate = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
  );
}

export default function FuelQuoteForm() {
  return (
    <div className='FuelQuoteForm_wrapper'>
      <h2>Fuel Quote Form</h2>
      <form className='FQF_form'>
        <label for="numGallons">Gallons Requested:</label> <br />
        <input type="numeric" id="numGallons" name="numGallons" required/> <br />

        <label for="address">Delivery Address:</label> <br />
        <textarea type="text" id="address" name="address" value="123 Main St Houston, TX 77001" required/> <br />

        <label for="date">Delivery Address:</label> <br />
        <FuelDate></FuelDate>

        <label for="suggestedPrice">Suggested Price/Gallon:</label> <br />
        <input type="numeric" id="suggestedPrice" name="suggestedPrice" readonly="true" value="$1" required/> <br />

        <label for="amountDue">Total Amount Due:</label> <br />
        <input type="numeric" id="amountDue" name="amountDue" readonly="true" value="helppp" required/> <br />        

      </form>

    </div>
  )
}
