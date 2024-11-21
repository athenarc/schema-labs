import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ExperimentsProvider from "../preview/ExperimentsProvider";
import ExperimentDetails from "./ExperimentDetails";
import { Container } from 'react-bootstrap';


const ExperimentListDetails = () => 
    <div className="d-flex flex-column min-vh-100">
        <Container className="flex-grow-1">
            <Row>
                <Col>
                    <h1 className="display-6">Experiment Details</h1>
                    <Container>
                        <ExperimentsProvider>
                            <ExperimentDetails>
                                <ExperimentDetails />
                            </ExperimentDetails>
                        </ExperimentsProvider>
                    </Container>
                </Col>
            </Row>
        </Container>
    </div>

export default ExperimentListDetails;