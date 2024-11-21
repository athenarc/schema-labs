import React, { createContext, useContext, useEffect, useState } from "react";
import { listTasks } from "../../api/v1/actions";
import { UserDetailsContext } from "../../utils/components/auth/AuthProvider";
import { useClientPreferences } from "../../client/ClientPreferencesProvider";

export const TasksContext = createContext();

export const useTaskData = () => {
    const {taskData, setTaskData} = useContext(TasksContext);
    return {taskData, setTaskData};
}

export const useTaskFilters = () => {
    const {taskFilters, setTaskFilters, selectedTasks, setSelectedTasks} = useContext(TasksContext);
    return {taskFilters, setTaskFilters, selectedTasks, setSelectedTasks};
}

const TasksListProvider = ({children}) => {
    const { clientPreferences } = useClientPreferences()
    const {pageSize} = clientPreferences;

    const [taskData, setTaskData] = useState(null);
    const [taskFilters, setTaskFilters] = useState({
        token: "",
        statuses: {},
        order: "-submitted_at",
        page: 0
    });

    const [selectedTasks, setSelectedTasks] = useState([]);
    const { userDetails } = useContext(UserDetailsContext);

    const refreshInterval = 5000; // TaskData refresh rate (every 5sec)


    const fetchTaskData = ()=>{
        const filters = {
            ...taskFilters,
            statuses: Object.keys(taskFilters.statuses).filter(k=>taskFilters.statuses[k]),
            view: "detailed",
            limit: pageSize,
            offset: taskFilters.page*pageSize
        };
        listTasks({
            filters,
            auth: userDetails.apiKey
        }).then(response=>{
            if (response.ok && response.status===200) {
                return response.json()
            }
        }).then(data=>{
            setTaskData({
                count: data.count,
                results: data.results
            });
        })
    };

    useEffect(() => {
        fetchTaskData();
    }, [taskFilters]);

    // Every refreshInterval seconds call fetchTaskData task
    useEffect(() => {
        const intervalId = setInterval(fetchTaskData, refreshInterval);
        return () => clearInterval(intervalId);
    }, [taskFilters]);
    
    return <TasksContext.Provider value={{taskData, setTaskData, taskFilters, setTaskFilters, selectedTasks, setSelectedTasks }}>
        {children}
    </TasksContext.Provider>
    
}

export default TasksListProvider;