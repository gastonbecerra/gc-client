import React from 'react'
import { Navbar, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineHome } from "react-icons/ai";
export default function Header() {
    const { username, id: user_id} = useSelector(state => state.user)

    return ( 
        <Navbar id="header" expand="lg" variant="light" bg="light">
            <Container>
            <Navbar.Brand ><AiOutlineHome id="icon-header"/><Link style={{textDecoration: 'none', color: 'black', fontWeight:'650'}} to={"/"}>Get Context( )</Link></Navbar.Brand>
            <span style={{position:'absolute', top:'4.3vh'}}>{username && username} {user_id && user_id}</span> 
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" >
            <NavDropdown title="Menú" id="basic-nav-dropdown">
                <NavDropdown.Item>
                    <Link to={"/signin"} style={{textDecoration: 'none', color: 'black'}}>Sign In</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                    <Link to={"/signup"} style={{textDecoration: 'none', color: 'black'}}>Sign Up</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                    <Link to={"/"} style={{textDecoration: 'none', color: 'black'}}>Logout</Link>
                </NavDropdown.Item>
            </NavDropdown>
            </Navbar.Collapse>
            </Container>
        </Navbar>        
    )
}
