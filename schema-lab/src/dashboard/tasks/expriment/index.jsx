import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import HorizontalMenu from './HorizontalMenu';
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
      <HorizontalMenu />

      <Row className="p-5">
        <Col>
        <h1 className="display-6 mb-4">Welcome to Experiments</h1>
          <p>
            This is your Experiments dashboard where you can manage and create new experiments.
            Use the menu above to view or create your experiments.
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
