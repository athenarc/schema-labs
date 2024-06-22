import React from 'react';
import { useTaskDetails } from './TaskListDetails';

const Inputs = () => {
    const selectedTask = useTaskDetails();

    return (
        <div>
            {selectedTask ? (
                <div>
                    <span class="d-block p-2 text-dark">{selectedTask.uuid}</span>
                </div>
            ) : (
                <p>-</p>
            )}
        </div>
    );
};

export default Inputs;