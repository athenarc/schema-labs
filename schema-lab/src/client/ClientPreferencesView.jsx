import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useClientPreferences } from "./ClientPreferencesProvider";
import { cloneDeep } from "lodash";

const UserPreferencesView = () => {
    const { clientPreferences, setClientPreferences } = useClientPreferences();
    const [localClientPreferences, setLocalClientPreferences] = useState(cloneDeep(clientPreferences));

    const savePreferences = evt => {
        evt.preventDefault();
        const newClientPreferences = cloneDeep(localClientPreferences);
        setClientPreferences(newClientPreferences);
    }
    return <Row className="justify-content-center">
        <Col lg={6}>
            <Form onSubmit={savePreferences}>
                <Form.Group className="mb-3" controlId="pageSize">
                    <Form.Label>Page size</Form.Label>
                    <Form.Control type="number" value={localClientPreferences.pageSize} onChange={evt => setLocalClientPreferences({
                        ...localClientPreferences,
                        pageSize: Number.parseInt(evt.target.value)
                    })} />
                    <Form.Text className="text-muted">
                        Controls the amount of results displayed in list views
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save changes
                </Button>
            </Form>
        </Col>
    </Row>
}

export default UserPreferencesView;