import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Dropdown from "react-bootstrap/Dropdown";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import logo from '../img/hypatia-lab-logo.png';
import {
    Link,
    Outlet
} from "react-router-dom";
import { UserDetailsContext } from "../utils/components/auth/AuthProvider";
import Footer from './Footer'; // Import the Footer component

const Base = props => {
    const { userDetails } = useContext(UserDetailsContext);
    const [showShadow, setShowShadow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const show = window.scrollY > 10;
            if (show !== showShadow) setShowShadow(show);
        };

        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [showShadow]);



    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar collapseOnSelect expand="lg" bg="white" data-bs-theme="light" sticky="top" className={showShadow ? "shadow-sm" : ""}>
                <Container>
                    <Navbar.Brand as={Link} to='/'>
                        <Image
                            src={logo} // Path to your image
                            alt="SCHEMA lab"
                            style={{
                                height: '60px', // Set height to match button size
                                width: 'auto', // Maintain aspect ratio
                            }}
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto ms-5">
                            {userDetails && <Nav.Link as={Link} to={"/dashboard"}>Dashboard</Nav.Link>}
                            {userDetails && <Nav.Link as={Link} to={"/ro-crates"}>RO-crates</Nav.Link>}
                            {userDetails && <Button className="ms-3" as={Link} to={"/runtask"} variant="outline-primary">Run a task</Button>}
                        </Nav>
                        <Nav className="text-primary">
                            {userDetails 
                                ? (
                                    <>
                                        <Button variant="primary" as={Link} to="/logout" className="me-2">Logout</Button>
                                        {/* <Dropdown>
                                            <Dropdown.Toggle variant="primary" id="dropdown-basic" className="rounded-pill">
                                                Logged in with API key: {userDetails.apiKey.substring(0, 8)}...
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item as={Link} to="/preferences">Preferences</Dropdown.Item>
                                                <Dropdown.Item as={Link} to="/logout">Logout</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown> */}
                                    </>
                                ) : (
                                    <>
                                        <Button variant="primary" as={Link} to="/aboutus" className="me-2">About us</Button>
                                        <Button variant="primary" as={Link} to="/auth">Login</Button>
                                    </>
                                )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="flex-grow-1 mt-5">
                <Outlet />
            </Container>
            <Footer />
        </div>
    );
}

export default Base