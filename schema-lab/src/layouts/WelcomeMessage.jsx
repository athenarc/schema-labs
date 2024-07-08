import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';


const WelcomeCard = () => {
  return (
    <div>
      <div className="card-header bg-primary text-light text-center py-2">
        <h2 className="card-title mb-0">Welcome to Experiments!</h2>
      </div>
      <div className="card-body">
        <p className="card-text">
          We're excited to have you onboard! Customize your experiments to suit your needs with our intuitive tools and organized workspace. Explore how Projects can help your team work better together and ship faster.
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
      </div>
    </div>
  );
};

export default WelcomeCard;
