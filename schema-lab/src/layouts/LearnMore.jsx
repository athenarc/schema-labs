import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';


const LearnMore = () => {
  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h1>What is SCHEMA Lab?</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            <strong>SCHEMA Lab</strong> is an open-source platform designed to assist researchers and scientists in managing and executing computational tasks efficiently. It specializes in submitting and monitoring containerized task execution requests, providing a seamless environment for your computational needs.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Key features currently supported:</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup variant="flush">
            <ListGroup.Item className="border-0 text-muted">
              <strong>Task Management</strong>
            </ListGroup.Item>
            <ListGroup.Item className="border-0 text-muted">
              <strong>Create and Run Tasks:</strong> Easily create computational tasks and monitor their execution in real-time.
            </ListGroup.Item>
            <ListGroup.Item className="border-0 text-muted">
              <strong>Track Task Status:</strong> Stay informed with clear status indicators showing whether tasks are submitted, running, completed, or have encountered errors.
            </ListGroup.Item>
            <ListGroup.Item className="border-0 text-muted">
              <strong>Manage with Ease:</strong> Cancel or rerun tasks with just a click, ensuring flexibility and control over your computational workflows.
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <p>
            Open-source code for SCHEMA Lab is available here: <a href="https://github.com/athenarc/schema" target="_blank" rel="noopener noreferrer">SCHEMA Lab</a>
          </p>
        </Col>
      </Row>

    </Container>
  );
};

export default LearnMore;
