import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default function Footer() {
    return (

    <>
    <Navbar id="footer" class="align" bg="light" variant="dark">
        
        <Link to={"/"}><span>Módulos</span></Link>
        <Link to={"/"}>Feed</Link>
        <Link to={"/"}>Contextos</Link>
        <Link to={"/"}>Feed</Link>
        
    </Navbar>
    </>


    )
}
