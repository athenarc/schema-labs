import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, Image, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { UserDetailsContext } from "../utils/components/auth/AuthProvider";
import Footer from './Footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { getProjectName } from "../api/v1/actions";
import config from "../config/config.json";

const Base = (props) => {
    const { logo, logo_alt } = config.landing_page;
    const { userDetails } = useContext(UserDetailsContext);
    const [showShadow, setShowShadow] = useState(false);
    const [projectName, setProjectName] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false); // Track the dropdown state

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

    // Handlers to show/hide the dropdown on hover
    const handleMouseEnter = () => setDropdownOpen(true);
    const handleMouseLeave = () => setDropdownOpen(false);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar variant="light" bg="light" expand="lg" sticky="top" className={showShadow ? "shadow-sm" : ""}>
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <Image
                            src={logo}
                            alt={logo_alt}
                            style={{ height: '60px', width: 'auto' }}
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto ms-5">
                            {userDetails && (
                                <>
                                    {/* Dashboard Dropdown Menu */}
                                    <NavDropdown
                                        id="nav-dropdown-dashboard"
                                        title="Tasks"
                                        menuVariant="light"
                                        show={dropdownOpen}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        className="ms-3"
                                    >
                                        <NavDropdown.Item as={Link} to="/dashboard" className="text-dark">
                                            View
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/runtask" className="text-dark">
                                            Run a Task
                                        </NavDropdown.Item>
                                    </NavDropdown>

                                    {/* Experiments Button */}
                                    <Nav.Link as={Link} to="/experiment" className="ms-3 text-dark">
                                        Experiments
                                    </Nav.Link>

                                    {/* RO-crates Button */}
                                    <Nav.Link as={Link} to="/ro-crates" className="ms-3 text-dark">
                                        RO-crates
                                    </Nav.Link>
                                </>
                            )}
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
                                        <Button variant="primary" as={Link} to="/logout" className="rounded-pill px-4">
                                            <FontAwesomeIcon icon={faRightToBracket} className="me-2" />Logout
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button variant="outline-primary" as={Link} to="/aboutus" className="me-2">About Us</Button>
                                        <Button variant="outline-primary" as={Link} to="/auth">Login</Button>
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
};

export default Base;
