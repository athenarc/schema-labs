import React from 'react';
import { useTaskDetails } from './TaskListDetails';
import { Card, Alert } from 'react-bootstrap';
import JSONViewer from 'react-json-view'; // install npm install react-json-view

const Executors = () => {
    const taskDetails = useTaskDetails();

    return (
        <div>
            {taskDetails ? (
                <Card className="mt-3">
                    <Card.Body>
                        <JSONViewer src={taskDetails.executors} theme="default:inverted" />
                    </Card.Body>
                </Card>
            ) : (
                <Alert variant="warning" className="mt-3">
                    No task details are available!
                </Alert>
            )}
        </div>
    );
};

export default Executors;