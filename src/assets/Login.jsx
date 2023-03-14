import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "../css/Login.css"

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registerHandler = async (event) => {
    event.preventDefault(); // prevent the default form submission behavior

    const data = { username, password }; // create a JSON object with the username and password.
    try {
      const response = await fetch('/Register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log(responseData); // log the response data to the console in the browser.
    } catch (error) {
      console.error('Error:', error);
    }
  };

  //use state handlers to keep data entered fresh and correct
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className='login_wrapper'>
      <Form>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </Form.Group>
        <div className="buttons">
          <Button variant="primary" type="submit">
            Login
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={registerHandler}
          >
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
}
