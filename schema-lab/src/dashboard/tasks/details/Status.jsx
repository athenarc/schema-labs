import React from 'react';
import { useTaskDetails } from './TaskListDetails';

const Status = () => {
    const selectedTask = useTaskDetails();

    return (
        <div>
            {selectedTask ? (
                <div>
                    <span class="d-block p-2 text-dark">{selectedTask.status}</span>
                </div>
            ) : (
                <p>-</p>
            )}
        </div>
    );
};

export default Status;