import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowUp, faList, faFileCircleCheck, faFileCircleXmark, faStopwatch, faGears, faCheck, faXmark, faQuestion } from '@fortawesome/free-solid-svg-icons';

const TaskStatus = (props) => {
    let color, icon, text = props.status;
    switch (props.status) {
        case "SUBMITTED":
            icon = faFileArrowUp;
            color = "info";
            break;
        case "APPROVED":
            icon = faFileCircleCheck;
            color = "info";
            break;
        case "REJECTED":
            color = "danger";
            icon = faFileCircleXmark;
            break;
        case "SCHEDULED":
            icon = faStopwatch;
            color = "info";
            break;
        case "INITIALIZING":
        case "RUNNING":
            icon = faGears;
            color = "info";
            break;
        case "COMPLETED":
            color = "success";
            icon = faCheck;
            break;
        case "ERROR":
        case "CANCELED":
            color = "danger";
            icon = faXmark;
            break;
        case "ALL":
            color = "dark"
            icon = faList;
            break;
        case "UNKNOWN":
        default:
            text = "UNKNOWN";
            color = "muted";
            icon = faQuestion;
            break;
    }
   
    useEffect(() => {
        if (props.onColorChange) {
            props.onColorChange(color);
        }
    }, [color, props]);

    return (
        <span className={`text-${color}`}>
            <FontAwesomeIcon icon={icon} /> {text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()}
        </span>
    );
};

export default TaskStatus;