import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import Form from 'react-bootstrap/Form';

import "../css/FuelQuoteForm.css"
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const FuelDate = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
  );
}

export default function FuelQuoteForm() {
  const [gallonsRequested, setGallonsRequested] = useState(0)
  const [suggestedPrice, setSuggestedPrice] = useState(5)
  const [amountDue, setAmountDue] = useState(0)

  useEffect (() => {
    setAmountDue(gallonsRequested * suggestedPrice)
  }, [gallonsRequested])


  return (
    <div className='FuelQuoteForm_wrapper'>
      <h2>Fuel Quote Form</h2>
      <Form>
        <Form.Group controlId='gallonsRequested'>
          <Form.Label>Gallons Requested:</Form.Label>
          <Form.Control placeholder="Enter number of gallons requested" onChange={e => setGallonsRequested(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId='deliveryAddress'>
          <Form.Label>Delivery Address:</Form.Label>
          <Form.Control value="123 Main St Houston, TX 77001" required />
        </Form.Group>

        <Form.Group controlId='deliveryDate'>
          <Form.Label>Delivery Date:</Form.Label>
          <FuelDate></FuelDate>
        </Form.Group>

        <Form.Group controlId='suggestedPrice'>
          <Form.Label>Suggested Price:</Form.Label>
          <Form.Control placeholder="Suggested price" value={suggestedPrice}/>
        </Form.Group>

        <Form.Group controlId='amountDue'>
          <Form.Label>Total Amount Due:</Form.Label>
          <Form.Control placeholder="Total due" value={amountDue} />
        </Form.Group>
      </Form>
    </div>
  )
}