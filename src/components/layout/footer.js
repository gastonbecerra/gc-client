import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'

export default function Footer() {
    return (

    <>
    <Navbar id="footer" bg="dark" variant="dark">
        <Container>
        <Nav className="me-auto">
        <Nav.Link href="">Dashboard</Nav.Link>
        <Nav.Link href="">Modulos</Nav.Link>
        <Nav.Link href="">Contextos</Nav.Link>
        <Nav.Link href="">Feed</Nav.Link>
        </Nav>
        </Container>
    </Navbar>
    </>


    )
}
