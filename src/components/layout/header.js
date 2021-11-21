import React from 'react'
import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Header() {
    return ( 
        <Navbar expand="lg" variant="light" bg="light">
            <Container>
            <Navbar.Brand ><Link style={{textDecoration: 'none', color: 'black', fontWeight:'650'}} to={"/"}>Get Context( )</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" >
            <NavDropdown title="Menú" id="basic-nav-dropdown">
                <NavDropdown.Item>
                    <Link to={"/signin"} style={{textDecoration: 'none', color: 'black'}}>Sign In</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                    <Link to={"/signup"} style={{textDecoration: 'none', color: 'black'}}>Sign Up</Link>
                </NavDropdown.Item>
            </NavDropdown>
            </Navbar.Collapse>
            </Container>
        </Navbar>        
    )
}
