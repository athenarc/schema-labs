import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";


const WelcomeCard = () => {
  return (
    <div>
      <div className="text-center ps-3 mt-4">
      <p className="display-6">Welcome to HYPATIA Lab</p>
      </div>
      <div className="card-body">
        <p className="card-text text-center">Your platform for managing computational tasks</p>
        <div className="text-center mt-4">
          <Button variant="primary" as={Link} to="/learnmore" className="me-2">Learn more</Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
