import React from 'react';
import { Nav, Container, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const HorizontalMenu = ({ isNextClicked }) => {
    const location = useLocation();

    return (
        <Navbar bg="light" className="shadow-sm">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link 
                        as={Link} 
                        to="/experiment" 
                        className={location.pathname === "/experiment" ? "fw-bold" : ""}
                    >
                        My Experiments
                    </Nav.Link>
                    <Nav.Link 
                        as={Link} 
                        to="/view"
                        className={`${location.pathname === "/view" ? "fw-bold" : ""} ${isNextClicked ? "fw-bold text-muted" : ""}`}
                        style={{ pointerEvents: isNextClicked ? "none" : "auto" }}
                    >
                        Create New Experiment
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default HorizontalMenu;
