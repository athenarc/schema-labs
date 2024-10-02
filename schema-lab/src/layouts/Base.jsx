import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Dropdown from "react-bootstrap/Dropdown";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import {
    Link,
    Outlet
} from "react-router-dom";
import { UserDetailsContext } from "../utils/components/auth/AuthProvider";
import Footer from './Footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { getProjectName } from "../api/v1/actions";
import config from "../config/config.json"

const Base = props => {
    const { welcomeLogo, welcomeLogoAlt } = config;
    const { userDetails } = useContext(UserDetailsContext);
    const [showShadow, setShowShadow] = useState(false);

    const [projectName, setProjectName] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            const show = window.scrollY > 10;
            if (show !== showShadow) setShowShadow(show);
        };

        document.addEventListener('scroll', handleScroll);
    
            if (userDetails && userDetails.apiKey) {
            getProjectName(userDetails.apiKey)
                .then(response => response.json())
                .then(data => {
                    setProjectName(data.name || 'No project name available');
                });
        }

        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [showShadow, userDetails]);



    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar collapseOnSelect expand="lg" bg="white" data-bs-theme="light" sticky="top" className={showShadow ? "shadow-sm" : ""}>
                <Container>
                    <Navbar.Brand as={Link} to='/'>
                        <Image
                            src={welcomeLogo}
                            alt={welcomeLogoAlt}
                            style={{
                                height: '60px', // Set height to match button size
                                width: 'auto', // Maintain aspect ratio
                            }}
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto ms-5">
                            {userDetails && <Button className="ms-3" as={Link} to={"/dashboard"} variant="outline-primary">Dashboard</Button>}
                            {userDetails && <Button className="ms-3" as={Link} to={"/experiment"} variant="outline-primary">Experiments</Button>}
                            {userDetails && <Button className="ms-3" as={Link} to={"/ro-crates"} variant="outline-primary">RO-crates</Button>}
                            {userDetails && <Button className="ms-3" as={Link} to={"/runtask"} variant="outline-primary">Run a task</Button>}
                        </Nav>
                        <Nav className="text-primary">
                            {userDetails 
                                ? (
                                    <>
                                        {projectName && (
                                            <span className="px-3 py-2 text-dark fw-bold">
                                                {projectName}
                                            </span>
                                        )}
                                        <Button variant="primary"  as={Link} to="/logout">
                                            <FontAwesomeIcon icon={faRightToBracket} className="me-2" />Logout</Button>
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