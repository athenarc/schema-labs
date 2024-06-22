import React from 'react';
import { useTaskDetails } from './TaskListDetails';

const Status = () => {
    const selectedTask = useTaskDetails();

    return (
        <div>
            {selectedTask ? (
                <div>
                    <p>{selectedTask.status}</p>
                </div>
            ) : (
                <p>-</p>
            )}
        </div>
    );
};

export default Status;