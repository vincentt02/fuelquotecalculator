import React from "react";
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

  return (
    <div className="ClientProfileManagement_wrapper">
      <h2>Client Profile Management</h2>
      <Form action="/api/clientprofilemanagement" method="POST">
        <Form.Group className="mb-3" controlId="fullName">
          <Form.Label>Full Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter full name"
            maxLength={50}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="addressOne">
          <Form.Label>Address 1:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address 1"
            maxLength={100}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="addressTwo">
          <Form.Label>Address 2:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address 2"
            maxLength={100}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="city">
          <Form.Label>City:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            maxLength={100}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="state">
          <Form.Label>State:</Form.Label>
          <Form.Select>
            {stateOptions.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="state">
          <Form.Label>Zipcode:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter zipcode"
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
