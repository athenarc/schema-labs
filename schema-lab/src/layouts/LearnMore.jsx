import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import config from "../config/config.json"


const LearnMore = () => {
  const { welcome } = config;

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h1>What is {welcome.keyword}?</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            <strong>{welcome.keyword}</strong> is a pre-release version of <a href={welcome.extraKeywordLink} className='text-dark'>{welcome.extraKeyword}</a>, currently available only to users of the HYPATIA platform. Full integration with {welcome.extraKeyword}'s open-source capabilities is coming soon.
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
              <strong>Submit and Run Tasks:</strong> Easily submit and run computational tasks.
            </ListGroup.Item>
            <ListGroup.Item className="border-0 text-muted">
              <strong>Track Task Status:</strong> Stay informed with clear status indicators showing whether tasks are submitted, running, completed, or have encountered errors.
            </ListGroup.Item>
            <ListGroup.Item className="border-0 text-muted">
              <strong>Manage with Ease:</strong> Cancel tasks with just a click, ensuring flexibility and control over your computational workflows.
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h1>Quick start</h1>
        </Col>
      </Row>
      <Row className="mt-1">
        <Col>
          <p>How to connect and use {welcome.keyword}:</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup variant="flush">
            <ListGroup.Item className="border-0 text-muted">
              <strong>Access {welcome.keyword}:</strong> Log in to the {welcome.keyword} with your credentials.
              Navigate to the Dashboard and click "Access" next to your active on demand batch computation project.
            </ListGroup.Item>
            <ListGroup.Item className="border-0 text-muted">
              <strong>Generate API Key:</strong> In the "Approved Resources" section, select "API tokens management."
              Generate an API key by following the instructions provided. This API key will allow you to connect to {welcome.keyword}.
            </ListGroup.Item>
            <ListGroup.Item className="border-0 text-muted">
              <strong> Connect to {welcome.keyword}:</strong> Visit the {welcome.keyword} platform and log in using the API key you generated.
              Once logged in, you can start submitting and monitoring your computational tasks directly through the {welcome.keyword} interface.
            </ListGroup.Item>
            <ListGroup.Item className="border-0 text-muted">
              <strong>Submit and Monitor Tasks:</strong> Use the "Run a Task" feature to submit new tasks.
              Monitor your task status using the "Dashboard" and make any necessary adjustments, such as canceling tasks.
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <p>
            Open-source code for {welcome.extraKeyword} is available here: <a href={welcome.extraKeywordLink} target="_blank" rel="noopener noreferrer" className='text-dark'>{welcome.extraKeyword}</a>
          </p>
        </Col>
      </Row>

    </Container>
  );
};

export default LearnMore;
