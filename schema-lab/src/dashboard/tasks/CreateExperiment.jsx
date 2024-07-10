import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const CreateExperiment = () => {
    const [experimentName, setExperimentName] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        // placeholder
    };

    return (
        <Container className="mt-5">
            <h2>Create New Experiment</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formExperimentName">
                    <Form.Label>Experiment Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter experiment name"
                        value={experimentName}
                        onChange={(e) => setExperimentName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formDescription" className="mt-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formDescription" className="mt-3">
                    <Form.Label>Selected Tasks Placeholder</Form.Label>
                </Form.Group>
                <Row className="mt-3">
                    <Col className="d-flex">
                        <Button className="me-1" variant="primary" type="submit">
                            Create
                        </Button>
                        <Button variant="primary" onClick={() => navigate("/Dashboard")}>Back</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default CreateExperiment;
