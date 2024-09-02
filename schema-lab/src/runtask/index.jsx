import React, { createContext, useContext, useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import { UserDetailsContext } from "../utils/components/auth/AuthProvider";
import { getProjectName } from "../api/v1/actions";

const TaskFilterContext = createContext();

export const useTaskFilters = () => {
    return useContext(TaskFilterContext);
}
 
const RunTask = () => {
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

    return (
        <div className="d-flex flex-column min-vh-100">
        <Container className="flex-grow-1">
            <Row>
                <Col>
                    <h1 className="display-6 mb-4">Setup a Task</h1>
                    <p className="display-7">
      This form allows you to submit a new task for your current project: <strong>{projectName}</strong>. Please ensure all required fields marked with an asterisk (*) are completed before submission.
    </p>
                    <Container>
                        <TaskForm />
                    </Container>
                </Col>
            </Row>
        </Container>
    </div>
    );
};

export default RunTask;


