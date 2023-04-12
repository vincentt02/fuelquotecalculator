import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import Form from "react-bootstrap/Form";
import "../css/FuelQuoteForm.css";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { token } from "../assets/Login.jsx";

export default function FuelQuoteForm() {
  const [gallonsRequested, setGallonsRequested] = useState('');
  const [dateRequested, setDateRequested] = useState('');
  const [suggestedPrice, setSuggestedPrice] = useState(null);
  const [amountDue, setAmountDue] = useState(null);
  const [clientAddress, setClientAddress] = useState(0);

  const handleQuote = async () => {
    // calculate suggested price and total price in the backend
    const formattedDate = format(dateRequested, "MM/dd/yyyy");
    try {
      const response = await fetch("api/fuelquote/suggestedprice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gallonsRequested: gallonsRequested,
          dateRequested: formattedDate,
          token: token,
        })
      });
      if (response.ok) {
        const data = await response.json();
        setSuggestedPrice(data.suggestedPrice);
        setAmountDue(gallonsRequested * data.suggestedPrice);
      }
    } catch (error) {
      console.log(error.error);
    }
  };

  const handleSubmit = async () => {
    // send user gallons and date first
    const formattedDate = format(dateRequested, "MM/dd/yyyy");
    try {
      const response = await fetch("api/fuelquote/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gallonsRequested: gallonsRequested,
          dateRequested: formattedDate,
          address: clientAddress,
          token: token,
        }),
      });
      if (response.ok) {
        console.log("POST REQUEST OKAY");
        setGallonsRequested(null); // reset gallonsRequested to blank
        setDateRequested(""); // reset dateRequested to blank
        setSuggestedPrice(null);
        setAmountDue(null);
      }
    } catch (error) {
      console.log(error.error);
    }
  };

  useEffect(() => {
    const sendClientToken = async () => {
      try {
        const response = await fetch("api/fuelquote/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token }),
        });
        if (response.ok) {
          console.log("successfully sent token");
        }
      } catch (error) {
        console.log(error.error);
      }
    };

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

    sendClientToken();
    getClientAddress();
  }, []);

  return (
    <div className="FuelQuoteForm_wrapper">
      <h2>Fuel Quote Form</h2>
      <Form>
        <Form.Group controlId="gallonsRequested">
          <Form.Label>Gallons Requested:</Form.Label>
          <Form.Control
            type="number"
            step="1"
            placeholder="Enter number of gallons requested"
            value={gallonsRequested ?? ''}
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
            dateFormat="MM/dd/yyyy"
            selected={dateRequested}
            onChange={(date) => {
              setDateRequested(date);
            }}
          />
        </Form.Group>

        <Form.Group controlId="suggestedPrice">
          <Form.Label>Suggested Price:</Form.Label>
          <Form.Control
            placeholder="Suggested Price per Gallons"
            value={suggestedPrice ?? ''}
            readOnly
          />
        </Form.Group>

        <Form.Group controlId="amountDue">
          <Form.Label>Total Amount Due:</Form.Label>
          <Form.Control placeholder="Total Amount Due" value={amountDue ?? ''} readOnly />
        </Form.Group>

        <Button
          variant="primary"
          onClick={handleQuote}
          disabled={!dateRequested || !gallonsRequested}
        >
          Get Quote
        </Button>
        <Button
          variant="success"
          onClick={handleSubmit}
          disabled={!dateRequested || !gallonsRequested || !suggestedPrice}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}
