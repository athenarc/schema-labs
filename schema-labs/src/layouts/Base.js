import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {
    Link,
    Outlet
} from "react-router-dom";

const Base = props => {
    return <><Navbar bg="light" data-bs-theme="light">
        <Container>
            <Navbar.Brand as={Link} to='/'>SCHEMA-labs</Navbar.Brand>
            <Nav className="justify-content-end">
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav>
        </Container>
    </Navbar>
        <Outlet />
    </>
}

export default Base