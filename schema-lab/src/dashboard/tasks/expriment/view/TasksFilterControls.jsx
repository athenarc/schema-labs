import React, { useRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useTaskFilters } from "../../TasksListProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight  } from "@fortawesome/free-regular-svg-icons";

const TasksFilterControls = () => {
    const { selectedTasks } = useTaskFilters();
    const navigate = useNavigate();
    const elementRef = useRef(null);

    const handleCreateExperiment = () => {
        navigate("/create", { state: { selectedTasks } });
    };

    return (
        <Row className="mt-3 align-items-center">
            <Col className="text-start">
                <h6 className="d-inline">
                <FontAwesomeIcon icon={faArrowAltCircleRight} className="ms-2"/> Select Tasks and click Next to continue:
                </h6>

                <Button
                    ref={elementRef}
                    onClick={handleCreateExperiment}
                    variant="outline-primary"
                    disabled={selectedTasks.length === 0}
                    className="ms-2"
                >
                    Next
                </Button>
            </Col>
        </Row>
    );
};

export default TasksFilterControls;
