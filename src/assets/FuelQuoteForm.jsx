import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import Form from "react-bootstrap/Form";
import "../css/FuelQuoteForm.css";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FuelQuoteForm() {
  const [gallonsRequested, setGallonsRequested] = useState(0);
  const [dateRequested, setDateRequested] = useState(0);
  const [suggestedPrice, setSuggestedPrice] = useState(0);
  const [amountDue, setAmountDue] = useState(0);
  const [clientAddress, setClientAddress] = useState(0);

  useEffect(() => {
    const getClientAddress = async () => {
      try {
        const response = await fetch("/api/fuelquote/clientdata", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setClientAddress(data.clientAddress);
        } else {
          console.log("bruh");
        }
      } catch (error) {
        console.log(error.error);
      }
    };
    getClientAddress();
  }, []);

  const handleGetQuote = async () => {
    // retrieve and display
    try {
      const response = await fetch("api/fuelquote/suggestedprice", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("successful Get Quote");
        console.log(data);
        console.log(dateRequested);
        setSuggestedPrice(data.suggestedPrice);
        setAmountDue(gallonsRequested * data.suggestedPrice);
      }
    } catch (error) {
      console.log(error.error);
    }
  };

  return (
    <div className="FuelQuoteForm_wrapper">
      <h2>Fuel Quote Form</h2>
      <Form>
        <Form.Group controlId="gallonsRequested">
          <Form.Label>Gallons Requested:</Form.Label>
          <Form.Control
            placeholder="Enter number of gallons requested"
            onChange={(e) => setGallonsRequested(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="deliveryAddress">
          <Form.Label>Delivery Address:</Form.Label>
          <Form.Control value={clientAddress} required readOnly />
        </Form.Group>

        <Form.Group controlId="deliveryDate">
          <Form.Label>Delivery Date:</Form.Label>
          <DatePicker
            format="MM/dd/yyyy"
            selected={dateRequested}
            onChange={(date) => {
              setDateRequested(date);
            }}
          />
        </Form.Group>

        <Form.Group controlId="suggestedPrice">
          <Form.Label>Suggested Price:</Form.Label>
          <Form.Control
            placeholder="Suggested price"
            value={suggestedPrice}
            readOnly
          />
        </Form.Group>

        <Form.Group controlId="amountDue">
          <Form.Label>Total Amount Due:</Form.Label>
          <Form.Control placeholder="Total due" value={amountDue} readOnly />
        </Form.Group>

        <Button
          variant="primary"
          onClick={handleGetQuote}
          disabled={!dateRequested || !gallonsRequested}
        >
          Get Quote
        </Button>
      </Form>
    </div>
  );
}
