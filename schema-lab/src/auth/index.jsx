import React, { useContext, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { UserDetailsContext } from "../utils/components/auth/AuthProvider";
import LoginPrompt from "./LoginPrompt";
import LogoutPrompt from "./LogoutPrompt";
import WelcomeCard from "../layouts/WelcomeMessage";

const Auth = () => {
    const { userDetails } = useContext(UserDetailsContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (userDetails) {
            navigate('/dashboard');
        }
    }, [userDetails]);
    const internal = userDetails
        ? <LogoutPrompt />
        : <Row>
            <Col className="border-end border-muted-subtle"><WelcomeCard /> {/* Placeholder for potential register prompt */}</Col>
            <Col className="p-4">
                <LoginPrompt />
            </Col>
        </Row>

    return <Row className="justify-content-center p-1">
        <Col className="border border-light-subtle rounded p-4">
            {internal}
        </Col>
    </Row>
}

export default Auth;