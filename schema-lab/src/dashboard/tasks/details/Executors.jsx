import React, { useState } from 'react';
import { useTaskDetails } from './TaskListDetails';
import { Card, Alert, Table, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import JSONViewer from 'react-json-view'; // install npm install react-json-view


// Helper function to format the value
const formatValue = (value) => {
    if (Array.isArray(value) && value.every(item => typeof item === 'string')) {
        // Join the array of strings with a space
        return value.join(' ');
    } else if (typeof value === 'string' && value.trim().includes(' ')) {
        // Split the value by space and join with a single space
        return value.split(/\s+/).join(' ');
    }
    return value;
};

// Helper function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// Tooltip content
const renderTooltip = (props) => (
    <Tooltip id="tooltip" {...props}>
        Switch between JSON viewer and regular view
    </Tooltip>
);

const Executors = () => {
    const taskDetails = useTaskDetails();
    const [showJsonViewer, setShowJsonViewer] = useState(false);

    // Check if taskDetails and executors data exist
    if (!taskDetails || !taskDetails.executors) {
        return (
            <Alert variant="warning" className="mt-3">
                Sorry, no task details are available!
            </Alert>
        );
    }

    const executorsData = Array.isArray(taskDetails.executors) ? taskDetails.executors : [taskDetails.executors];

    return (
        <div>
            <OverlayTrigger placement="top" overlay={renderTooltip}>
                <Form.Check
                    type="checkbox"
                    id="toggle-view"
                    label={<span className="form-text text-muted">Switch to JSON viewer</span>}
                    checked={showJsonViewer}
                    onChange={(e) => setShowJsonViewer(e.target.checked)}
                />
            </OverlayTrigger>

            <div className="mt-1">
                {showJsonViewer ? (
                    <Card>
                        <Card.Body>
                            <JSONViewer src={taskDetails.executors} theme="default:inverted" />
                        </Card.Body>
                    </Card>
                ) : (
                    executorsData.map((executor, index) => (
                        <Card className="mt-1" key={index}>
                            <Card.Body className='pb-0'>
                                <Card.Subtitle className="p-2 bg-light fw-bold">Executor {index + 1}</Card.Subtitle>
                                <Table hover>
                                    <tbody>
                                        {Object.entries(executor).map(([key, value]) => (
                                            <tr key={key}>
                                                <td className="col-1 bg-light text-end">{capitalizeFirstLetter(key)}:</td>
                                                <td>{formatValue(value)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default Executors;