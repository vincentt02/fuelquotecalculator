import React from 'react'
import '../assets/FuelQuoteHistory.css'
const data = [
  {numG: 20, address: "2701 Helena st", date: "05/16/2001", price: 214, due: 287}
]


export default function FuelQuoteHistory() {
  return (
    <><div>FuelQuoteHistory</div><table className="fuelTable">
      <tr>
        <th className="fuelTableth">Gallons Requested</th>
        <th className="fuelTableth">Delivery Address</th>
        <th className="fuelTableth">Delivery Date</th>
        <th className="fuelTableth">Suggested Price per Gallon</th>
        <th className="fuelTableth">Total Amount Due</th>
      </tr>
      {data.map((val, key) => {
          return (
            <tr key={key}>
              <td className="fuelTabletd">{val.numG}</td>
              <td className="fuelTabletd">{val.address}</td>
              <td className="fuelTabletd">{val.date}</td>
              <td className="fuelTabletd">{val.price}</td>
              <td className="fuelTabletd">{val.due}</td>
            </tr>
          )
        })}
    </table></>
  )
}