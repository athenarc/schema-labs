import React, { useContext, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import { UserDetailsContext } from "../utils/components/auth/AuthProvider";

const ApiKeyLogin = props => {
    const [apiKey, setApiKey] = useState(null);
    const { userDetails, setUserDetails } = useContext(UserDetailsContext);

    const handleLogin = event => {
        event.preventDefault();
        setUserDetails({
            apiKey,
            type: "apiKey"
        });
    };     

    if (userDetails) {
        return <span>Already logged in</span>
    }
    return <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="apiKeyInput">
            {/* Temporarily disabled since API key is the only available login method */}
            {/* <Form.Label>API key</Form.Label> */} 
            <Form.Control type="password" placeholder="API key" onChange={e => setApiKey(e.target.value)} />
        </Form.Group>
        <Button variant="primary" className="me-2" type="submit">
            Log in
        </Button>
    </Form>
}

export default ApiKeyLogin;