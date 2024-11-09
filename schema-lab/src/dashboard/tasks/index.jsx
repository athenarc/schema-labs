import React, { createContext, useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TasksFilterControls from "./TasksFilterControls";
import TaskList from "./TasksList";
import TasksListProvider from "./TasksListProvider";
import TasksPaginationControls from "./TasksPaginationControls";
import { UserDetailsContext } from "../../utils/components/auth/AuthProvider";
import { getProjectName } from "../../api/v1/actions";
import Tooltip from 'react-bootstrap/Tooltip';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const Tasks = () => {
    const { userDetails } = useContext(UserDetailsContext); // Ensure this context provides `userDetails`
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

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            You are currently connected using a token for the project: {projectName}
        </Tooltip>
    );

    return (
        <Row>
            <Col>
                    <h1 className="display-6">
                        Project Tasks
                        <OverlayTrigger
                            placement="right"
                            overlay={renderTooltip}
                        >
                            <FontAwesomeIcon
                                icon={faQuestionCircle}
                                className="fs-6 py-2"
                                style={{ cursor: 'pointer' }}
                            />
                        </OverlayTrigger>
                    </h1>

                
                    <TasksListProvider>
                        <TasksFilterControls />
                        <TasksPaginationControls />
                        <Row className="p-3 mb-5">
                            <Col>
                                <TaskList />
                            </Col>
                        </Row>
                    </TasksListProvider>
            </Col>
        </Row>
    );
};

export default Tasks;