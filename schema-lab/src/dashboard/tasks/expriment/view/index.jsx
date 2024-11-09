import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TasksFilterControls from "./TasksFilterControls";
import TasksListProvider from "../../TasksListProvider";
import TasksPaginationControls from "../../TasksPaginationControls";
import ExprimentTaskList from "./TasksList";

const Experiment = () => {

    return (
        <>
        <Row>
            <Col>
                <TasksListProvider>
                    <TasksFilterControls />
                    <TasksPaginationControls />
                    <Row className="p-3 mb-5">
                        <Col>
                            <ExprimentTaskList />
                        </Col>
                    </Row>
                </TasksListProvider>
            </Col>
        </Row>
        </>
    );
};

export default Experiment;