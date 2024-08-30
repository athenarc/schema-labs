import React from "react";
import TaskForm from "./TaskForm";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { Container } from "react-bootstrap";

const RunTask = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
        <Container className="flex-grow-1">
            <Row>
                <Col>
                    <h1 className="display-6 mb-4">Setup a Task</h1>
                    <Container>
                        <TaskForm />
                    </Container>
                </Col>
            </Row>
        </Container>
    </div>
    );
};

export default RunTask;


