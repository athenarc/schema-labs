import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import config from "../config";
import configuration from "../config/config.json"

const LoginPrompt = props => {

    /* Three cases:
     *  No login provider has been passed
     *  One login provider has been passed
     *  Multiple login providers have been passed
     */
    const [selectedLoginProviderId, setSelectedLoginProviderId] = useState('');
    const DEFAULT_PROVIDER_ID = 'api_key';

    const { welcome } = configuration

    const availableLoginProviders = config.auth.login_providers.reduce((availableLoginProviders, { id, loginProviderName, LoginProvider }) => {
        availableLoginProviders[id] = { loginProviderName, LoginProvider };
        return availableLoginProviders;
    }, {});
    const handleSelectOptionChanged = evt => {
        const _selectedLoginProviderId = evt.target.value;
        console.log(_selectedLoginProviderId)
        setSelectedLoginProviderId(_selectedLoginProviderId);
    }
    const EffectiveLoginProvider = availableLoginProviders[DEFAULT_PROVIDER_ID] && availableLoginProviders[DEFAULT_PROVIDER_ID].LoginProvider;

    if (Object.keys(availableLoginProviders).length === 0) {
        return <Alert variant="danger">
            <Alert.Heading>No login has been configured</Alert.Heading>
            <p>You may have to contact the administrators of the current domain to notify for this issue</p>
        </Alert>
    }
    else {
        return <Row>
            <Col>
                <Row>
                    <Col>
                        <p className="display-6 text-center">Login</p>
                        <p>Use your credentials to log in and gain access to the {welcome.extraKeyword} features</p>
                    </Col>
                </Row>
                <Row>        
                    <Col>
                        {EffectiveLoginProvider && <EffectiveLoginProvider />}
                    </Col>
                </Row>
            </Col>
        </Row>;
    }
}

export default LoginPrompt;