import React, { useContext, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import { UserDetailsContext } from "../utils/components/auth/AuthProvider";

const ApiKeyLogin = props => {
    const [apiKey, setApiKey] = useState('');
    const [error, setError] = useState(''); 
    const { userDetails, setUserDetails } = useContext(UserDetailsContext);

    const validateApiKey = (key) => {
        return key && key.length >= 128; // 128 is the length of the API_KEY. Now, it's a dummy value.
    };

    const handleLogin = event => {
        event.preventDefault();

        if (!validateApiKey(apiKey)) {
            setTimeout(() => {
                setError('Invalid API key: Please check for typos or ensure your API key has not expired');
            }, 2000);
            return;
        }

        setUserDetails({
            apiKey,
            type: "apiKey"
        });
    };

    if (userDetails) {
        return <span>Already logged in</span>;
    }

    return (
        <Form onSubmit={handleLogin}>
            {error && (
                <Alert variant="danger" onClose={() => setError('')} dismissible>
                    {error}
                </Alert>
            )}
            <Form.Group className="mb-3" controlId="apiKeyInput">
                <Form.Control
                    type="password"
                    placeholder="API key"
                    value={apiKey}
                    onChange={e => setApiKey(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" className="me-2" type="submit">
                Log in
            </Button>
        </Form>
    );
}

export default ApiKeyLogin;
