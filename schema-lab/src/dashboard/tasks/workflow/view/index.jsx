import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";


const Workflow = ({ taskDetails }) => {
    return (
        <Row>
            <Col>
                {/* <TasksListProvider initialTasks={taskDetails}>
                    <TasksFilterControls />
                    <TasksPaginationControls />
                    <Row className="p-3 mb-5">
                        <Col>
                            <ExperimentTaskList />
                        </Col>
                    </Row>
                </TasksListProvider> */}
            </Col>
        </Row>
    );
};

export default Workflow;