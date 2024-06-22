import React from 'react';
import { useTaskDetails } from './TaskListDetails';

const Name = () => {
    const selectedTask = useTaskDetails();

    return (
        <div>
            {selectedTask ? (
                <div>
                    <span class="d-block p-2 text-dark">{selectedTask.name}</span>
                </div>
            ) : (
                <p>-</p>
            )}
        </div>
    );
};

export default Name;