import React from 'react'

const data = [
  {numG: 20, address: "2701 Helena st", date: "05/16/2001", price: 214, due: 287}
]


export default function FuelQuoteHistory() {
  return (
    <><div>FuelQuoteHistory</div><table>
      <tr>
        <th>Gallons Requested</th>
        <th>Delivery Address</th>
        <th>Delivery Date</th>
        <th>Suggested Price per Gallon</th>
        <th>Total Amount Due</th>
      </tr>
      {data.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.numG}</td>
              <td>{val.address}</td>
              <td>{val.date}</td>
              <td>{val.price}</td>
              <td>{val.due}</td>
            </tr>
          )
        })}
    </table></>
  )
}