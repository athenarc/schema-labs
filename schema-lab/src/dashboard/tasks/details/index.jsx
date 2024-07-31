import React from "react";
import TaskListDetails from "./TaskListDetails";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TasksListProvider from "../TasksListProvider";
import TasksFilterControls from "../TasksFilterControls";
import { Container } from 'react-bootstrap';


const Details = () => 
    <div className="d-flex flex-column min-vh-100">
        <Container className="flex-grow-1">
            <Row>
                <Col>
                    <h1 className="display-6">Task Details</h1>
                    <Container>
                        <TasksListProvider>
                            <TasksFilterControls />
                            <TaskListDetails>
                                <TaskListDetails />
                            </TaskListDetails>
                        </TasksListProvider>
                    </Container>
                </Col>
            </Row>
        </Container>
    </div>

export default Details;