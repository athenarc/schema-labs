import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

import { faArrowDownAZ, faArrowDownZA, faCheck, faFileArrowUp, faFileCircleCheck, faFileCircleXmark, faGears, faQuestion, faStopwatch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Table from "react-bootstrap/Table";
import { useTaskData, useTaskFilters } from "./TasksListProvider";
import { cloneDeep } from "lodash";

const TaskStatus = props => {
    let color, icon, text = props.status;
    switch (props.status) {
        case "SUBMITTED":
            icon = faFileArrowUp;
            color = "info";
            break;
        case "APPROVED":
            icon = faFileCircleCheck
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
        case "UNKNOWN":
        default:
            text = "UNKNOWN";
            color = "muted";
            icon = faQuestion;
            break;
    }
    return <span className={`text-${color}`}><FontAwesomeIcon icon={icon} /> {text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()}</span>
}

const TaskListing = props => {
    return <tr>
        <td><Link to={"#"}>{props.uuid}</Link></td>
        <td><TaskStatus status={props.status} /></td>
        <td>{new Date(props.submitted_at).toLocaleString('el')}</td>
        <td>{props.completed_at ? new Date(props.completed_at).toLocaleString('el') : "-"}</td>
        <td className="text-end">
            <Dropdown as={ButtonGroup} size="sm">
                <Button variant="primary" size="sm">Details...</Button>

                <Dropdown.Toggle split variant="primary" size="sm" id="dropdown-split-basic" />

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1" disabled>Cancel</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </td>
    </tr>
}

const ColumnOrderToggle = ({ columnName, currentOrder, setOrder }) => {
    const active = (currentOrder && currentOrder.endsWith(columnName));
    const asc = (currentOrder && !currentOrder.startsWith("-"));
    const icon = (active && !asc) ? faArrowDownZA : faArrowDownAZ;
    const handleSwitchOrder = () => {
        if (active && asc) {
            setOrder(`-${columnName}`);
            return;
        }
        setOrder(columnName);
    }
    return <span role="button" className={"fw-bold" + ((active) ? " text-primary" : " text-muted")} onClick={handleSwitchOrder}><FontAwesomeIcon icon={icon} /></span>
}

const TaskList = () => {
    const { taskData } = useTaskData();
    const { taskFilters, setTaskFilters } = useTaskFilters();
    const [token, setToken] = useState(taskFilters.token);
    const [statuses, setStatuses] = useState({ ...(taskFilters.statuses) });
    // const [count, setCount] = useState(taskFilters.token);

    const orderBy = taskFilters.order;
    const setOrderBy = attribute => {
        const newTaskFilters = cloneDeep(taskFilters);
        newTaskFilters.order=attribute;
        setTaskFilters(newTaskFilters);
    }

    const handleNameInput = evt => {
        setToken(evt.target.value);
    }

    const restoreFilters = evt => {
        // on empty token restore filters
        if (evt.target.value === "") {
            setTaskFilters({...taskFilters, token:"", statuses:{}})
            
        } 
    }

    // Get filtered task elements on Enter pushed
    const handleApplyFilters = (event) => {
        let minCharThreshold = 2 // The minimum amount of characters to apply a filter
        // Apply filter on Enter key pushed and two charackter have typed
        if(event.key === 'Enter' && (event.target.value.length + 1) >= minCharThreshold){
            setTaskFilters({
                ...taskFilters,
                token,
                statuses: { ...statuses },
                page:0 // Always render first page of filtering results
            });
        }
    }

    // Get the amount of filtered elements found
    const findFilteredTokens = () => {
        if (taskData) {
            const { count } = taskData;
            if (count === 0) {
                return <div class="alert alert-warning text-center" role="alert">Your search <b>{token}</b> did not match any task!</div>
            }
        } else {
            return null
        }
     }

    return <Row className="p-3 mb-5">
        <Col className="align-items-center">
            {taskData && taskData.results && <Table borderless responsive>
                <thead>
                    <tr> 
                        <th>
                            <div class="input-group">
                                <span class="input-group-text fw-bold" id="search">Name/UUID&nbsp;<ColumnOrderToggle columnName={"uuid"} currentOrder={orderBy} setOrder={setOrderBy}/></span>
                                <input type="text" class="form-control" placeholder="Search..." aria-label="search" aria-describedby="search-box" value={token} onInput={handleNameInput} onKeyDown={handleApplyFilters} onChange={restoreFilters}/>
                            </div>
                        </th>
                        <th>Status <ColumnOrderToggle columnName={"status"} currentOrder={orderBy} setOrder={setOrderBy} /></th>
                        <th>Submission time <ColumnOrderToggle columnName={"submitted_at"} currentOrder={orderBy} setOrder={setOrderBy} /></th>
                        <th>Update time</th>
                        <th className="text-end">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {taskData.results.map(task => {
                        return <TaskListing {...task} />;
                    })}
                </tbody>
            </Table>
            }
        </Col>
        {findFilteredTokens()}
    </Row>;
}

export default TaskList;