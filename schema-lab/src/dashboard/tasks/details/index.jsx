import React from "react";
import TaskListDetails from "./TaskListDetails";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TasksListProvider from "../TasksListProvider";
import TasksFilterControls from "../TasksFilterControls";
import { Container } from 'react-bootstrap';


const Details = () => 
 <Row>
    <Col>
        <h1 class="display-6">Task Details</h1>
        <Container>
            <TasksListProvider>
            <TasksFilterControls />
                <TaskListDetails>
                        <TaskListDetails />
                </TaskListDetails>
            </TasksListProvider>
        </Container>
    </Col>
</Row>;

export default Details;