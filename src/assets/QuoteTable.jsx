import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { token } from "../assets/Login";

import hasClientInformation from "./hasClientInformation";



export default function QuoteTable() {
  const [quoteData, setQuoteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clientInformation, setClientInformation] = useState(null)

  const navigate = useNavigate();

  useEffect(() => {
    //function call to check if the user has clientinformation in the database
    const checkClientInformation = async () => {
      try {
        const data = await hasClientInformation(token);
        setClientInformation(data)
      } catch (error) {
        console.error(error)
      }
    }

    checkClientInformation()
    
    const sendClientToken = async () => {
      try {
        const response = await fetch("/api/quotetable/quotedata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token }),
        });

        if (response.ok) {
          console.log("successfully sent token");
        } else {
        }
      } catch (error) {}
    };
    const getQuoteData = async () => {
      try {
        const response = await fetch("/api/quotetable/quotedata", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json(); // resolve the promise to get data
          setQuoteData(data);
          setLoading(false);
          // console.log("successful", data); // log the data
        } else {
          setError("Error retrieving quote data");
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    sendClientToken();
    getQuoteData();
  }, []);

  //Redirect the user to the client profile management form if no clientinformation is found
  useEffect(() => {
    if(clientInformation === false)
    navigate("/clientinformation")
  }, [clientInformation, navigate])

  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Gallons Requested: </th>
          <th>Delivery Address: </th>
          <th>Delivery Date: </th>
          <th>Suggested Price per Gallon: </th>
          <th>Total Amount Due: </th>
        </tr>
      </thead>
      <tbody>
        {quoteData.map((quote, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{quote.numG}</td>
              <td>{quote.address}</td>
              <td>{quote.date}</td>
              <td>${quote.price}</td>
              <td>${quote.due}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
