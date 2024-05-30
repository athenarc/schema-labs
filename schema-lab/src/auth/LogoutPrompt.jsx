import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const LogoutPrompt = () => {
    return <Button as={Link} to="/logout" variant="danger">Logout</Button>
}

export default LogoutPrompt;