import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const WelcomeCard = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <div className="card-header text-classic text-center py-2">
        <h2 className="card-title mb-0">Welcome to Experiments!</h2>
      </div>
      <div className="card-body">
        <p className="card-text">
          We're excited to have you onboard! Customize your experiments to suit your needs with our intuitive tools and organized workspace. Explore how Experiments can help your team work better and faster.
        </p>
        <ListGroup variant="flush" className="text-left">
          <ListGroup.Item className="border-0 text-muted">
            <strong>Create Experiments:</strong> Combine one or more tasks (execution instances) into a computational experiment.
          </ListGroup.Item>
          <ListGroup.Item className="border-0 text-muted">
            <strong>Manage Tasks:</strong> Easily select and group tasks using checkboxes.
          </ListGroup.Item>
          <ListGroup.Item className="border-0 text-muted">
            <strong>View Details:</strong> Access detailed information about each task and experiment.
          </ListGroup.Item>
          <ListGroup.Item className="border-0 text-muted">
            <strong>Export and Share:</strong> Export experiments as RO-crates and register them on RO-Hub, or download and import them for further use.
          </ListGroup.Item>
        </ListGroup>
        <div className="text-center mt-4">
          <Button variant="primary" onClick={handleShow} className="rounded-pill px-4">
            Learn more
          </Button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Help Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Welcome to the Experiments platform! Here are the steps to guide you through:</p>
          <ListGroup variant="flush">
            <ListGroup.Item className="border-0 text-muted">
              <strong>Access the Experiments Interface:</strong> Navigate to the "Experiments" tab in the main menu.
            </ListGroup.Item>
            <ListGroup.Item className="border-0 text-muted">
              <strong>Select Tasks:</strong> In the tasks list, use the checkboxes in the first column to select the tasks you want to include in your experiment. These tasks represent the execution instances.
            </ListGroup.Item>
            <ListGroup.Item className="border-0 text-muted">
              <strong>Create Experiment:</strong> Once you have selected the desired tasks, click the "Create Experiment" button. This button is located at the top of the tasks list.
            </ListGroup.Item>
            <ListGroup.Item className="border-0 text-muted">
              <strong>Name and Configure Experiment:</strong> A new window will appear prompting you to name your experiment. Enter a descriptive name and add a description for this experiment.
            </ListGroup.Item>
            <ListGroup.Item className="border-0 text-muted">
              <strong>Save Experiment:</strong> After configuring your experiment, click the "Save" button. Your experiment will now appear in the "Experiments" tab.
            </ListGroup.Item>
            <ListGroup.Item className="border-0 text-muted">
              <strong>View and Manage Experiments:</strong> You can view all your experiments in the "Experiments" tab. Click on an experiment to see the detailed view, including all tasks involved. Each task within an experiment is clickable, allowing you to view its individual details.
            </ListGroup.Item>
            <ListGroup.Item className="border-0 text-muted">
              <strong>Export and Register:</strong> To export your experiment as an RO-crate, select the experiment and click the "Export" button. For registering the experiment in RO-Hub, click the "Register" button. You may be prompted to add additional fields required for registration.
            </ListGroup.Item>
          </ListGroup>
          <p>By following these steps, you can effectively create and manage experiments, streamlining your computational workflows and improving organization in your research projects.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WelcomeCard;
