import React, { createContext, useContext } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TasksFilterControls from "./TasksFilterControls";
import TaskList from "./TasksList";
import TasksListProvider from "./TasksListProvider";
import TasksPaginationControls from "./TasksPaginationControls";

const TaskFilterContext = createContext();

export const useTaskFilters = () => {
    return useContext(TaskFilterContext);
}

const Tasks = () => <Row>
    <Col>
        <h1 className="display-6">Tasks</h1>
        <TasksListProvider>
            <TasksFilterControls />
            <TasksPaginationControls />
            <Row className="p-3 mb-5">
                <Col>
                    <TaskList/>
                </Col>
            </Row>
        </TasksListProvider>
    </Col>
</Row>;

export default Tasks;