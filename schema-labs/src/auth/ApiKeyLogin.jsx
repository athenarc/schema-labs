import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import { UserDetailsContext } from "../utils/AuthProvider";
import { useContext } from "react";

const ApiKeyLogin = props => {
    const [apiKey, setApiKey] = useState(null);
    const {userDetails, setUserDetails} = useContext(UserDetailsContext);

    const handleLogout = event => {
        event.preventDefault();
        setUserDetails(null);
    }

    const handleLogin = event => {
        event.preventDefault();
        console.log('Got API key: ', apiKey);
        setApiKey(null);
        setUserDetails({
            apiKey,
            type: "apiKey"
        });
    };
    if (userDetails) {
        return <Container>
            <span>Logged in with {userDetails.apiKey}</span>
            <span>Current inputState: {String(apiKey)}</span>
            <Form onSubmit={handleLogout}>
                <Button variant="primary" type="submit">
                    Log out
                </Button>
            </Form>
        </Container>
    }
    return <Container>
        <Form onSubmit={handleLogin}>
            <span>Current inputState: {String(apiKey)}</span>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>API key</Form.Label>
                <Form.Control type="password" placeholder="API key" onChange={e=> setApiKey(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Log in
            </Button>
        </Form>
    </Container>
}

export default ApiKeyLogin;