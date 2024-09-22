import React, { useState } from 'react';
import { Form, Button, Row, Col, Card, Container, Table, Modal } from "react-bootstrap";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import TaskStatus from "../TaskStatus";


const CreateExperiment = () => {
    const navigate = useNavigate();
    const [experimentName, setExperimentName] = useState('');
    const [description, setDescription] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [activeKey, setActiveKey] = useState("0");
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const location = useLocation();
    const [selectedTasks, setSelectedTasks] = useState(location.state?.selectedTasks || []);


    const handleToggle = (key) => {
        setActiveKey(activeKey === key ? null : key);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const requiredFields = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('is-invalid');
            } else {
                field.classList.remove('is-invalid');
            }
        });

        if (isValid) {
            setShowModal(true);
        }
    };

    const handleBackClick = () => {
        setShowConfirmModal(true);
    };

    const handleConfirmBack = () => {
        setShowConfirmModal(false);
        navigate(-1);
    };

    const handleCancelBack = () => {
        setShowConfirmModal(false);
    };

    const handleClear = () => {
        setDescription("");
        setExperimentName("");
        setSelectedTasks([]);
    };

    return (
        <Container className='py-5'>
            <Card className="border-0 shadow-sm rounded-3 mb-4">
                <Card.Body>
                    <p className="text-muted mb-4" style={{ fontSize: '0.875rem' }}>
                        *All fields marked with an asterisk (*) are required.
                    </p>
                    <Form onSubmit={handleSubmit}>
                        <Card className="border-0 shadow-sm rounded-3 mb-4">
                            <Card.Header className={`bg-primary text-white py-3 ${activeKey === "0" ? "border-bottom" : ""}`}>
                                Basic Information
                            </Card.Header>
                            <Card.Body>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="3" className="fw-bold">
                                        Name <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Col sm="9">
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={experimentName}
                                            onChange={(e) => setExperimentName(e.target.value)}
                                            placeholder="Type name..."
                                            required
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="3" className="fw-bold">
                                        Description <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Col sm="9">
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            name="description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Enter a detailed description..."
                                            required
                                        />
                                    </Col>
                                </Form.Group>
                            </Card.Body>
                        </Card>

                        <Card className="border-0 shadow-sm rounded-3 mb-4">
                            <Card.Header className={`bg-primary text-white py-3 ${activeKey === "0" ? "border-bottom" : ""}`}>
                                Selected Tasks
                            </Card.Header>
                            <Card.Body>
                                <Table borderless responsive hover>
                                    <thead>
                                        <tr>
                                            <th>Name/UUID</th>
                                            <th>Status</th>
                                            <th>Submission Time</th>
                                            <th>Update Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedTasks.length === 0 ? (
                                            <tr>
                                                <td colSpan="4">
                                                    <div className="alert alert-warning text-center" role="alert">
                                                        No tasks selected.
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            selectedTasks.map((task) => (
                                                <tr key={task.uuid}>
                                                    <td>
                                                        <Link to={`/task-details/${task.uuid}/executors`}>{task.uuid}</Link>
                                                    </td>
                                                    <td><TaskStatus status={task.state.status} /></td>
                                                    <td>{new Date(task.submitted_at).toLocaleString('en')}</td>
                                                    <td>{new Date(task.state.updated_at).toLocaleString('en')}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                        <div className="d-flex justify-content-end mt-4">
                            <Button variant="primary" className="me-2" onClick={handleClear}>
                                Clear All
                            </Button>
                            <Button variant="secondary" className="me-2" onClick={handleBackClick}>
                                Edit
                            </Button>
                            <Button variant="success" type="submit">
                                Save
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>

            <Modal show={showConfirmModal} onHide={handleCancelBack}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit experiment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Confirm you want to edit the experiment?  Unsaved changes will be lost.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCancelBack}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleConfirmBack}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );
};

export default CreateExperiment;
