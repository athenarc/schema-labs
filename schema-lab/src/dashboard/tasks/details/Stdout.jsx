import React from 'react';
import { useTaskDetails } from './TaskListDetails';

const Stdout = () => {
    const selectedTask = useTaskDetails();

    return (
        <div>
            {selectedTask ? (
                <div>
                    <p>{selectedTask.name}</p>
                </div>
            ) : (
                <p>-</p>
            )}
        </div>
    );
};

export default Stdout;