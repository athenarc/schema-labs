import React from 'react';
import { useTaskDetails } from './TaskListDetails';

const Name = () => {
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

export default Name;