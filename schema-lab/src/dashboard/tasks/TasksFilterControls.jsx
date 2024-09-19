import React, { useEffect, useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { formalize } from "../../utils/text";
import isEqual from "lodash/isEqual";
import { useTaskFilters } from "./TasksListProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const TasksFilterControls = () => {
    const [show, setShow] = useState(false);
    const [showFixedFilterButton, setShowFixedFilterButton] = useState(false);

    const elementRef = useRef(null);

    return <Row>
        <Col xs={6}>

        </Col>
            <Col xs={6} className="text-end">
                <Link to="/experiment">
                    <Button ref={elementRef} variant="primary">Create Experiment <FontAwesomeIcon icon={faPlus} /></Button>
                </Link>       
            </Col>
    </Row>;
}

const TasksFilterForm = ({ show, hideCallback }) => {
    const { taskFilters, setTaskFilters } = useTaskFilters();
    const [token, setToken] = useState(taskFilters.token);
    const [statuses, setStatuses] = useState({ ...(taskFilters.statuses) });

}

export default TasksFilterControls;