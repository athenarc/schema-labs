import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { UserDetailsContext } from "../../../utils/components/auth/AuthProvider";
import { getProjectName } from "../../../api/v1/actions";

const Experiments = () => {

  const { userDetails } = useContext(UserDetailsContext);
  const [projectName, setProjectName] = useState(null);

  useEffect(() => {
      if (userDetails && userDetails.apiKey) {
          getProjectName(userDetails.apiKey)
              .then(response => {
                  return response.json();
              })
              .then(data => {
                  setProjectName(data.name || 'No project name available');
              });
      }
  }, [userDetails]);

  return (
    <Container fluid>

      <Row className="p-5">
        <Col>
        <h1 className="display-6 mb-4">Welcome to Experiments</h1>
          <p className="lead">
            This interface provides a streamlined experience for creating and managing computational experiments. You can:
          </p>
          <ul>
            <li>
              <strong>Create Experiments:</strong> Combine one or more tasks (execution instances) into a computational experiment.
            </li>
            <li>
              <strong>Manage Tasks:</strong> Easily select and group tasks using checkboxes.
            </li>
            <li>
              <strong>View Details:</strong> Access detailed information about each task and experiment.
            </li>
            <li>
              <strong>Export and Share:</strong> Export experiments as RO-Crates and register them on RO-Hub to enhance research reproducibility.
            </li>
          </ul>
          <p className="mt-4">
            Customize your experiments with intuitive tools and an organized workspace tailored to your needs.
          </p>
          <Button variant="primary" href="#">
            Learn More
          </Button>
        </Col>
         {/* <h1 className="display-6 my-3">Setup experiment for project: {projectName}</h1> */}
      </Row>
    </Container>
  );
};

export default Experiments;
