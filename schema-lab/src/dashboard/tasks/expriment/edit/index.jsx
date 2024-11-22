import React, { useState, useEffect } from "react";
import PatchExperiment from "./ExperimentEdit";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";

const EditExperiment = () => {
    const [nextClicked, setNextClicked] = useState(true);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Container className="flex-grow-1">
                <Row>
                    <Col>
                        <Container>
                            <PatchExperiment />
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default EditExperiment;
