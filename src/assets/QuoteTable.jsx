import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";

export default function QuoteTable() {
  const [quoteData, setQuoteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
          console.log("successful", data); // log the data
        } else {
          setError("Error retrieving quote data");
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    getQuoteData();
  }, []);

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
