import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

// import '../css/NavigationBar.css'

import { Link } from 'react-router-dom';


export default function NavigationBar() {
  return (
    <Container fluid>
    <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="me-auto">
            <Nav.Link><Link to="/">Home</Link></Nav.Link>
            <Nav.Link><Link to="/fuelquoteform">Fuel Quote Form</Link></Nav.Link>
            <Nav.Link><Link to="/fuelquotehistory">Fuel Quote History</Link></Nav.Link>
            <Nav.Link><Link to="/clientinformation">Client Profile Management</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
    </Container>
  )
}
