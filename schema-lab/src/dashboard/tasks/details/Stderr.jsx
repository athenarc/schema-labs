import React from 'react';
import { Table, Alert } from 'react-bootstrap';
import { useTaskDetails } from './TaskListDetails';

const Stderr = () => {
    const taskDetails = useTaskDetails();

    return (
        <div>
            {taskDetails.stderr && taskDetails.stderr.length > 0 ? (
                <Table bordered hover responsive className="mt-3">
                    <thead className="table-light">
                        <tr className="text-center">
                            <th>Executor ID</th>
                            <th>Path</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taskDetails.stderr.map((stderr, index) => (
                            <tr className="text-center" key={index}>
                                <td>{index + 1}</td>
                                <td>{stderr ? stderr : <span className="text-muted">No STDERR path is available!</span>}</td>    
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <Alert variant="warning" className="mt-3">
                    No task details are available!
                </Alert>
            )}
        </div>
    );
};

export default Stderr;