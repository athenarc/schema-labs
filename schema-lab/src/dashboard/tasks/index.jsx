import React, { createContext, useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TasksFilterControls from "./TasksFilterControls";
import TaskList from "./TasksList";
import TasksListProvider from "./TasksListProvider";
import TasksPaginationControls from "./TasksPaginationControls";
import { UserDetailsContext } from "../../utils/components/auth/AuthProvider";
import { getProjectName } from "../../api/v1/actions";

const TaskFilterContext = createContext();

export const useTaskFilters = () => {
    return useContext(TaskFilterContext);
}

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

    return (
        <Row>
            <Col>
                <h1 className="display-6">Tasks for project: {projectName}</h1>
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