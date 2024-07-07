import React from 'react';
import { Table, Alert } from 'react-bootstrap';
import { useTaskDetails } from './TaskListDetails';

const Inputs = () => {
    const taskDetails = useTaskDetails();

    return (
        <div>
            {taskDetails && taskDetails.inputs && taskDetails.inputs.length > 0 ? (
                <Table bordered hover responsive className="mt-3">
                    <thead className="table-light">
                        <tr className="text-center">
                            <th>#</th>
                            <th>URL</th>
                            <th>Path</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taskDetails.inputs.map((input, index) => (
                            <tr className="text-center" key={index}>
                                <td>{index + 1}</td>
                                <td>{input.url}</td> 
                                <td>{input.path}</td>
                                <td>{input.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <Alert variant="warning" className="mt-3">
                    No task details are available or no inputs found!
                </Alert>
            )}
        </div>
    );
};

export default Inputs;