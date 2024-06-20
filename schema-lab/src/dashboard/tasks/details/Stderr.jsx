import React from 'react';
import { useTaskDetails } from './TaskListDetails';

const Stderr = () => {
    const selectedTask = useTaskDetails();

    return (
        <div>
            {selectedTask ? (
                <div>
                    <p>{selectedTask.uuid}</p>
                </div>
            ) : (
                <p>-</p>
            )}
        </div>
    );
};

export default Stderr;