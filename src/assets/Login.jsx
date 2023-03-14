import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "../css/Login.css"



export default function Login() {

  const [formData, setFormData] = React.useState({username: "", password: ""});
  
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value})
  }

  const loginHandler = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("/Login", {
        method: "POST",
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify(formData)
      });

      if(response.ok) {
        console.log("successful")
      } else {

      } 
    } catch (error) {
      console.error("Error:", error);
    }
  }

    return (
  <div className='login_wrapper'>
      <Form
      id="Login"
      onSubmit={loginHandler}
      >
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username:</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Enter Username" 
        onChange={handleInputChange} 
        required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        type="password" 
        placeholder="Enter Password" 
        onChange={handleInputChange}
        required
        />
      </Form.Group>
      <div className="buttons">
      <Button 
      variant="primary" 
      type="submit"
      onClick={loginHandler}
      >
        Login
      </Button>
      <Button variant="danger" type="button">
        Register
      </Button>
      </div>
    </Form>
  </div>
    )
}