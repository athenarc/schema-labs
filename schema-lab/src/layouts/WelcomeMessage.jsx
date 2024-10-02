import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import config from "../config/config.json"


const WelcomeCard = () => {
  const { welcome } = config;

  return (
    <div>
      <div className="text-center ps-3 mt-4">
      <p className="display-6">{welcome.text}</p>
      </div>
      <div className="card-body">
        <p className="card-text text-center">{welcome.extraText}</p>
        <div className="text-center mt-4">
          <Button variant="primary" as={Link} to="/learnmore" className="me-2">Learn more</Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
