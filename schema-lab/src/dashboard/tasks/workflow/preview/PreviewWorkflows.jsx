import React, { useState, useContext } from "react";
import { Row, Col, Table, DropdownButton, Dropdown, OverlayTrigger, Tooltip, Modal, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownAZ, faArrowDownZA } from "@fortawesome/free-solid-svg-icons";
import { UserDetailsContext } from "../../../../utils/components/auth/AuthProvider";


const ColumnOrderToggle = ({ columnName, currentOrder, setOrder }) => {
    const isActive = currentOrder && currentOrder.endsWith(columnName);
    const isAsc = currentOrder && !currentOrder.startsWith("-"); // Ascending order is without a leading "-"
    const icon = isActive && isAsc ? faArrowDownZA : faArrowDownAZ;

    const handleToggle = () => {
        // Toggle the order based on the current state
        setOrder(isActive && isAsc ? `-${columnName}` : columnName);
    };

    return (
        <span
            role="button"
            className={`fw-bold ${isActive ? "text-primary" : "text-muted"}`}
            onClick={handleToggle}
        >
            <FontAwesomeIcon icon={icon} />
        </span>
    );
};

const PreviewWorkflows = () => {

    const { userDetails } = useContext(UserDetailsContext);
    const navigate = useNavigate();

   

    return (
        <Row className="p-3 mb-5">
            <Col>
                <Table borderless responsive hover>
                    <thead>
                        <tr>
                            <th className="text-center col-4">
                                <div className="input-group">
                                    <span className="input-group-text fw-bold">
                                        Name
                                    </span>
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={<Tooltip>Type at least 2 characters and push Enter.</Tooltip>}
                                    >
                                        <input
                                            type="text"
                                            className="form-control"
                                            // value={searchName}
                                            // onInput={handleSearchInput}
                                            // onKeyDown={applyFilters}
                                            // onChange={restoreFilters}
                                            placeholder="Search..."
                                        />
                                    </OverlayTrigger>
                                </div>
                            </th>
                            <th className="text-center">Submission</th>
                            <th className="text-center">
                                Last Update&nbsp;
                                <ColumnOrderToggle
                                    columnName="created_at"
                                    // currentOrder={ExperimentFilters.order}
                                    // setOrder={(newOrder) =>
                                    //     setExperimentFilters({ ...ExperimentFilters, order: newOrder })
                                    // }
                                />
                            </th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {filteredData.map(({ name, creator, created_at }) => (
                            <ExperimentListing
                                key={`${creator}-${name}`}
                                name={name}
                                creator={creator}
                                created_at={created_at}
                                onActionSelect={onActionSelect}
                            />
                        ))} */}
                    </tbody>
                </Table>
            </Col>
            {/* {filteredData.length === 0 && searchName.length >= 2 && (
                <div className="alert alert-warning text-center">
                    No experiments match <b>{searchName}</b> your search criteria.
                </div>
            )} */}

           
        </Row>
    );
};

export default PreviewWorkflows;
