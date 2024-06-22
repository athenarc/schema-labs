import React from 'react';
import { useTaskDetails } from './TaskListDetails';

const Inputs = () => {
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

export default Inputs;