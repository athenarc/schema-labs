import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";


const WelcomeCard = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <div className="text-center ps-3 mt-4">
      <p className="display-6">Welcome to SCHEMA Lab</p>
      </div>
      <div className="card-body">
        <p className="card-text text-center">Your platform for managing computational tasks.</p>
        <div className="text-center mt-4">
          <Button variant="primary" onClick={handleShow} className="rounded-pill px-4">
            Learn more
          </Button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>What is SCHEMA Lab?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>SCHEMA Lab</strong> is an open-source platform designed to assist researchers and scientists in managing and executing computational tasks efficiently. It specializes in submitting and monitoring containerized task execution requests, providing a seamless environment for your computational needs.
          </p>
          <p>Key features currently supported:</p>
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
          <p>
            Open-source code for SCHEMA Lab is available here: <a href="https://github.com/athenarc/schema" target="_blank" rel="noopener noreferrer">SCHEMA Lab</a>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="rounded-pill" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WelcomeCard;
