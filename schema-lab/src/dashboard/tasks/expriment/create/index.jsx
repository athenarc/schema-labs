import React, { useState } from "react";
import CreateExperiment from "./CreateExperiment";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import HorizontalMenu from "../HorizontalMenu";
 
const SelectTask = () => {

    const [nextClicked, setNextClicked] = useState(true);


    return (
        <>
        <HorizontalMenu  isNextClicked={nextClicked} />
        <div className="d-flex flex-column min-vh-100">
        <Container className="flex-grow-1">
            <Row>
                <Col>
                    <Container>
                            <CreateExperiment setNextClicked={setNextClicked} />
                    </Container>
                </Col>
            </Row>
        </Container>
    </div>
    </>
    );
};

export default SelectTask;
