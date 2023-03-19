import Table from 'react-bootstrap/Table';
import { useEffect } from 'react';

const data = [
  {numG: 20, address: "2701 Helena st", date: "05/16/2001", price: 2.14, due: 42.8},
  {numG: 456, address: "3552 travis St", date: "02/10/2001", price: 3.24, due: 1477.4}
]



function QuoteTable() {
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
      {data.map((val, key) => {
          return (
            <tr key={key}>
              <td>{key+1}</td>
              <td>{val.numG}</td>
              <td>{val.address}</td>
              <td>{val.date}</td>
              <td>${val.price}</td>
              <td>${val.due}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  );
}

export default QuoteTable;
