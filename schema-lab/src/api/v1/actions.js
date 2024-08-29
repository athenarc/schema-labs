import config from "../../config"

// const getTasks = (limit, offset) => {

//     fetch(`${config.api.url}/api/v1/test`,)
// }

export const listTasks = options => {
    let queryParameters = [];
    let headers = {};
    if (options) {
        if (options.filters) {
            if (options.filters.view) queryParameters.push(`view=${options.filters.view}`);
            if (options.filters.order) queryParameters.push(`order=${options.filters.order}`);
            if (options.filters.token) queryParameters.push(`search=${options.filters.token}`);
            if (options.filters.statuses) {
                options.filters.statuses.forEach(status => queryParameters.push(`status=${status.toUpperCase()}`));
            }
            if (options.filters.limit) queryParameters.push(`limit=${options.filters.limit}`);
            if (options.filters.offset) queryParameters.push(`offset=${options.filters.offset}`);
        }
        if (options.auth) {
            headers["Authorization"] = `Bearer ${options.auth}`;
        }
    }
    const qualifiedUrl=[`${config.api.url}/api/tasks`, queryParameters.join("&")].join("?");
    return fetch(
        qualifiedUrl,
        {
            method: "GET",
            headers
        }
    );
}

export const retrieveTaskDetails = ({taskUUID, auth}) => {
    const qualifiedUrl=`${config.api.url}/api/tasks/${taskUUID}`
    return fetch(
        qualifiedUrl,
        {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${auth}`
            }
        }
    ).then(response => {
        console.log('Response status:', response.status);
        return response;
    });
}

// Get project name from ipatia
export const getProjectName = (auth) => {
    const qualifiedUrl=`${config.api.url}/api/context-info`
    return fetch(
        qualifiedUrl,
        {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${auth}`
            }
        }
    ).then(response => {
        console.log('Project name response status:', response.status);
        return response;
    });
}

// POST details of run a task
// export const runTaskPost = (auth, requestData) => {
//     const qualifiedUrl = `${config.api.url}/api/tasks`;
//     return fetch(qualifiedUrl, {
//         method: "POST",
//         headers: {
//             'Authorization': `Bearer ${auth}`,
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestData)
//     }).then(response => {
//         console.log('Response status:', response.status);
//         return response;
//     });
// }
export const runTaskPost = async (apiKey, requestData) => {
    try {
        const response = await fetch(`${config.api.url}/api/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestData)
        });
        
        if (!response.ok) {
            // Handle errors based on response status
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        return response;
    } catch (error) {
        console.error('Error during fetch:', error);
        throw error;
    }
};


// Cancel a running task
export const cancelTaskPost = ({taskUUID, auth}) => {
    const qualifiedUrl=`${config.api.url}/api/tasks/${taskUUID}/cancel`
    return fetch(
        qualifiedUrl,
        {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${auth}`
            }
        }
    ).then(response => {
        console.log('Cancel request response status:', response.status);
        return response;
    });
}
