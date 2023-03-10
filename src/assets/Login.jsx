import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "../css/Login.css"


export default function Login() {
    return (
  <div className='login_wrapper'>
      <Form>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" placeholder="Enter Username" pattern="[A-Za-z0-9!@#$%^&*]{3,100}" 
        title="Username should not contain any spaces." id="username" required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Password" pattern="[A-Za-z0-9!@#$%^&*]{3,100}" 
        title="Password should not contain any spaces." id="password"  required/>
      </Form.Group>
      <div className="buttons">
      <Button variant="primary" type="submit">
        Login
      </Button>
      <Button variant="danger" type="submit">
        Register
      </Button>
      </div>
    </Form>
  </div>
    )
}