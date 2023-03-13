import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "../css/Login.css"


export default function Login() {
  
  const registerHandler = async (event) => {
    event.preventDefault(); // prevent the default form submission behavior
  
    const form = event.target; // get the form element
    const username = form.Username.value; // get the value of the username input field
    const password = form.Password.value; // get the value of the password input field
  
    const data = { username, password }; // create a JSON object with the username and password
    console.log("In register handler!")
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
      console.log(responseData); // log the response data to the console
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  return (
  <div className='login_wrapper'>
      <Form
        id = "Login"
        //function that is called when form is submitted.
      >
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" placeholder="Enter Username" required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Password" required/>
      </Form.Group>
      <div className="buttons">
      <Button variant="primary" type="submit">
        Login
      </Button>
      <Button variant="danger" type="button" onClick={registerHandler}>
        Register
      </Button>
      </div>
    </Form>
  </div>
    )
}