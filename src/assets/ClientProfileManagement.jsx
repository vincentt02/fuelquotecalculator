import React, {useState} from "react";
import "../css/ClientProfileManagement.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function ClientProfileManagement() {
  const stateOptions = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  const [formData, setFormData] = useState({fullName: "", addressOne: "", addressTwo: "", city: "", state: "Alabama", zipcode: ""});
  

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value})
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/clientprofilemanagement", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify(formData)
      });

      if(response.ok) {
        console.log("successful")
      } else {

      } 
    } catch (error) {

    }
  }

  return (
    <div className="ClientProfileManagement_wrapper">
      <h2>Client Profile Management</h2>
      <Form
        id="clientProfileManagement"
        onSubmit={submitHandler}
      >
        <Form.Group className="mb-3" controlId="formFullName">
          <Form.Label>Full Name:</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            placeholder="Enter full name"
            onChange={handleInputChange}
            maxLength={50}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAddressOne">
          <Form.Label>Address 1:</Form.Label>
          <Form.Control
            type="text"
            name="addressOne"
            placeholder="Enter address 1"
            onChange={handleInputChange}
            maxLength={100}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAddressTwo">
          <Form.Label>Address 2:</Form.Label>
          <Form.Control
            type="text"
            name="addressTwo"
            placeholder="Enter address 2"
            onChange={handleInputChange}
            maxLength={100}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCity">
          <Form.Label>City:</Form.Label>
          <Form.Control
            type="text"
            name="city"
            placeholder="Enter city"
            onChange={handleInputChange}
            maxLength={100}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formState">
          <Form.Label>State:</Form.Label>
          <Form.Select name="state" onChange={handleInputChange}>
            {stateOptions.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="zipcode">
          <Form.Label>Zipcode:</Form.Label>
          <Form.Control
            type="text"
            name="zipcode"
            placeholder="Enter zipcode"
            onChange={handleInputChange}
            pattern="[0-9]*"
            minlength="5"
            maxlength="9"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
