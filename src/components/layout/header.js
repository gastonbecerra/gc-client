import React from 'react'
import { Navbar, Container, NavDropdown } from 'react-bootstrap';


export default function Header() {
    return ( 
        <Navbar expand="lg" variant="light" bg="light">
            <Container>
            <Navbar.Brand href="/">Get Context()</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" >
            <NavDropdown title="Menú" id="basic-nav-dropdown">
                <NavDropdown.Item href="/signin">Sign In</NavDropdown.Item>
                <NavDropdown.Item href="/signup">Sign Up</NavDropdown.Item>
            </NavDropdown>
            </Navbar.Collapse>
            </Container>
        </Navbar>        
    )
}
