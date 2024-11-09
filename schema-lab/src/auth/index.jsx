import React, { useContext, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { UserDetailsContext } from "../utils/components/auth/AuthProvider";
import LoginPrompt from "./LoginPrompt";
import LogoutPrompt from "./LogoutPrompt";
import WelcomeCard from "../layouts/WelcomeMessage";
import { setLoginCookie, getCookie } from "../utils/cookies";

const Auth = () => {
    const { userDetails, setUserDetails } = useContext(UserDetailsContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = getCookie();
        
        if (token && !userDetails) {
            // Use cookie to login
            setUserDetails({
                apiKey: token,
                type: "apikey"
            });
            navigate('/dashboard');
        } else if (userDetails) {
            setLoginCookie(userDetails.apiKey, 1);
            navigate('/dashboard');
        }
    }, [userDetails, navigate]);
    


    const internal = userDetails
        ? <LogoutPrompt />
        : <Row>
            <Col className="border-end border-muted-subtle"><WelcomeCard /></Col>
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