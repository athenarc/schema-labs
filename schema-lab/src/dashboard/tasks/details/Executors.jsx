import React from 'react';
import { useTaskDetails } from './TaskListDetails';

const Executors = () => {

  const selectedTask = useTaskDetails();

  return (
      <div>
          {selectedTask ? (
              <div>
                 <span class="d-block p-2 text-dark">{selectedTask.uuid}</span>
              </div>
          ) : (
              <p>No task selected.</p>
          )}
      </div>
  );
};
export default Executors