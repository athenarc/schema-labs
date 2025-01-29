import React, { useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { UserDetailsContext } from "../../../../utils/components/auth/AuthProvider";
import { getProjectName } from "../../../../api/v1/actions";

const ViewWorkflows = () => {
    const { userDetails } = useContext(UserDetailsContext);
    const [projectName, setProjectName] = useState(null);

    useEffect(() => {
        if (userDetails && userDetails.apiKey) {
            getProjectName(userDetails.apiKey)
                .then((response) => response.json())
                .then((data) => {
                    setProjectName(data.name || "No project name available");
                })
                .catch(() => {
                    setProjectName("Error retrieving project name");
                });
        }
    }, [userDetails]);

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            You are currently connected using a token for the project: {projectName}
        </Tooltip>
    );


    return (
        <Row>
            <Col>
                <h1 className="display-6">
                        Project Experiments{" "}
                        <OverlayTrigger placement="right" overlay={renderTooltip}>
                        <FontAwesomeIcon
                            icon={faQuestionCircle}
                            className="fs-6 py-2"
                            style={{ cursor: "pointer" }}
                        />
                    </OverlayTrigger>
                </h1>
                <WorkflowProvider>
                    <WorkflowPaginationControls />
                    <Row className="p-3 mb-5">
                         <Col>
                             <WorkflowExperiments />
                         </Col>
                     </Row>
                </WorkflowProvider>
            </Col>
        </Row>

    );
};

export default ViewWorkflows;