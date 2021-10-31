import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap';
import { AiOutlineMenu } from "react-icons/ai";

export default function Header() {
    return (
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="/">Get Context()</Navbar.Brand>  
            <AiOutlineMenu id="menu-icon"/>      
        </Navbar>
    )
}
