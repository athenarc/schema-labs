import React, { useRef, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useTaskFilters } from "./TasksListProvider";

const TasksFilterControls = () => {
    const { selectedTasks } = useTaskFilters();
    const navigate = useNavigate();
    const elementRef = useRef(null);

    const handleCreateExperiment = () => {
        navigate("/experiment", { state: { selectedTasks } });
    };

    return (
        <Row>
            <Col xs={6}></Col>
            <Col xs={6} className="text-end">
                <Button ref={elementRef} onClick={handleCreateExperiment} variant="primary">
                    Create Experiment <FontAwesomeIcon icon={faPlus} />
                </Button>
            </Col>
        </Row>
    );
};

export default TasksFilterControls;
