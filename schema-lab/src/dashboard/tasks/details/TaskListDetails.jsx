import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import React, { useContext, createContext } from 'react';
import { TasksContext } from "../TasksListProvider";
import { Link, useLocation } from 'react-router-dom';


export const TaskDetailsContext = createContext();

export const useTaskDetails = () => {
    return useContext(TaskDetailsContext);
};


// Get all the details related to a specific Task UUID
const TaskListDetails = () => {
    const { uuid } = useParams();
    const { taskData } = useContext(TasksContext);

    const navigate = useNavigate();

    const location = useLocation();
    const currentPath = location.pathname;

    // Find the selected task based on taskId
    const selectedTask = taskData && taskData.results.find(task => task.uuid === uuid);

    return (
        <TaskDetailsContext.Provider value={selectedTask}>
        <div>
            <div>
                <small class="lead">UUID: {uuid} </small>
                <Navbar bg="light" data-bs-theme="info">
                    <Container>
                        <Nav variant="underline">
                            <Nav.Link as={Link} to="name" className={currentPath.endsWith('name') ? 'active' : ''}>Name</Nav.Link>
                            <Nav.Link as={Link} to="status" className={currentPath.endsWith('status') ? 'active' : ''}>Status</Nav.Link>
                            <Nav.Link as={Link} to="executors" className={currentPath.endsWith('executors') ? 'active' : ''}>Executors</Nav.Link>
                            <Nav.Link as={Link} to="stdout" className={currentPath.endsWith('stdout') ? 'active' : ''}>Stdout</Nav.Link>
                            <Nav.Link as={Link} to="stderr" className={currentPath.endsWith('stderr') ? 'active' : ''}>Stderr</Nav.Link>
                            <Nav.Link as={Link} to="inputs" className={currentPath.endsWith('inputs') ? 'active' : ''}>Inputs</Nav.Link>
                            <Nav.Link as={Link} to="outputs" className={currentPath.endsWith('outputs') ? 'active' : ''}>Outputs</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
                <Outlet />
            </div>
            <div class="mt-3">
                <Button variant="primary" onClick={() => navigate("/Dashboard")}>Back</Button>
            </div>
        </div> 
        </TaskDetailsContext.Provider>
    );
};

export default TaskListDetails;