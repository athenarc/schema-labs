import React from 'react';
import { useTaskDetails } from './TaskListDetails';

const Executors = () => {

  const selectedTask = useTaskDetails();

  return (
      <div>
          {selectedTask ? (
              <div>
                  <p>{selectedTask.uuid}</p>
              </div>
          ) : (
              <p>No task selected.</p>
          )}
      </div>
  );
};
export default Executors