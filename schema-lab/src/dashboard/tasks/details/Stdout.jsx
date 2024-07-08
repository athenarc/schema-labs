import React from 'react';
import { Table, Alert } from 'react-bootstrap';
import { useTaskDetails } from './TaskListDetails';

const Stdout = () => {
    const taskDetails = useTaskDetails();

    return (
        <div>
            {taskDetails.stdout && taskDetails.stdout.length > 0 ? (
                <Table bordered hover responsive className="mt-3">
                    <thead className="table-light">
                        <tr className="text-center">
                            <th>Executor ID</th>
                            <th>Path</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taskDetails.stdout.map((stdout, index) => (
                            <tr className="text-center" key={index}>
                                <td>{index + 1}</td>
                                <td>{stdout ? stdout : <span className="text-muted">No STDOUT path is available!</span>}</td>    
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

export default Stdout;