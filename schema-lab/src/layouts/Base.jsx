import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, Image, NavDropdown } from "react-bootstrap";
import { Link, Outlet, Navigate } from "react-router-dom";
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

    // Separate state for tracking each dropdown
    const [tasksDropdownOpen, setTasksDropdownOpen] = useState(false);
    const [experimentsDropdownOpen, setExperimentsDropdownOpen] = useState(false);

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
    const handleTasksMouseEnter = () => setTasksDropdownOpen(true);
    const handleTasksMouseLeave = () => setTasksDropdownOpen(false);

    const handleExperimentsMouseEnter = () => setExperimentsDropdownOpen(true);
    const handleExperimentsMouseLeave = () => setExperimentsDropdownOpen(false);

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
                                    {/* Tasks Dropdown Menu */}
                                    <NavDropdown
                                        id="nav-dropdown-tasks"
                                        title={<span className="text-primary">Tasks</span>}
                                        menuVariant="light"
                                        show={tasksDropdownOpen}
                                        onMouseEnter={handleTasksMouseEnter}
                                        onMouseLeave={handleTasksMouseLeave}
                                        className="ms-3 rounded-2 border border-primary"
                                    >
                                        <NavDropdown.Item as={Link} to="/dashboard" className="text-primary">
                                            View
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/runtask" className="text-primary">
                                            Run a Task
                                        </NavDropdown.Item>
                                    </NavDropdown>

                                    {/* Experiments Dropdown Menu */}
                                    <NavDropdown
                                        id="nav-dropdown-experiments"
                                        title={<span className="text-primary">Experiments</span>}
                                        menuVariant="light"
                                        show={experimentsDropdownOpen}
                                        onMouseEnter={handleExperimentsMouseEnter}
                                        onMouseLeave={handleExperimentsMouseLeave}
                                        className="ms-3 rounded-2 border border-primary"
                                    >
                                        <NavDropdown.Item as={Link} to="/experiment" className="text-primary">
                                            About
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/preview" className="text-primary">
                                            View
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/view" className="text-primary">
                                            Create
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/" className="text-muted disabled">
                                            Export RO-crates
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/" className="text-muted disabled">
                                            Publish RO-hub
                                        </NavDropdown.Item>
                                    </NavDropdown>
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
                                        <Button variant="primary" as={Link} to="/logout" className="px-4">
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

            {/* Default landing page when Experiments menu is clicked */}
            <Container className="flex-grow-1 mt-5">
                <Outlet />
            </Container>

            <Footer />
        </div>
    );
};

export default Base;
