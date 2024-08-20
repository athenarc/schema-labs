import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Card, Container, Accordion, OverlayTrigger, Tooltip, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';
import { runTaskPost } from "../api/v1/actions";
import { UserDetailsContext } from "../utils/components/auth/AuthProvider";

const TaskForm = () => {
    const navigate = useNavigate();
    const [activeKey, setActiveKey] = useState(null);
    const [showModal, setShowModal] = useState(false);
    // Set structure to store user-defined data
    const [basicData, setBasicData] = useState({name: "", description: "" });
    const [executors, setExecutors] = useState([{image: "", command: [], workdir: "", stdout: "", stderr: "", env: []}]);
    const [inputs, setInputs] = useState([{ name: "", description: "", url: "", path: "", content: "", type: ""}]);
    const [outputs, setOutputs] = useState([{ name: "", description: "", url: "", path: "", type: ""}]);
    const [resources, setResources] = useState([{ cpu_cores: "1", zones: "", preemptible: false, disk_size: 5.0, ram_size: 1.0 }]);
    const [tags, setTags] = useState({tag: []});
    const [volumes, setVolumes] = useState({path: []});
    const { userDetails } = useContext(UserDetailsContext);


    const handleToggle = (eventKey) => {
        setActiveKey(activeKey === eventKey ? null : eventKey);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const form = e.target;
        const requiredFields = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
    
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('is-invalid'); // Optionally, add a class for visual feedback
            } else {
                field.classList.remove('is-invalid');
            }
        });
    
        if (isValid) {
            // If all required fields are filled, show the confirmation modal
            setShowModal(true);
        }
    };

    const prepareRequestData = () => {
        const { name, description } = basicData;
        return {
            name,
            description,
            executors,
            inputs,
            outputs,
            resources,
            tags,
            volumes
        };
    };
    

    const handleConfirmSubmit = () => {
        const requestData = prepareRequestData();
        runTaskPost(userDetails.apiKey, requestData)
            .then(response => {
                if (response.ok) {
                    console.log('Task submitted successfully');
                    navigate('/success');
                } else {
                    console.error('Failed to submit task');
                }
            })
            .catch(error => {
                console.error('Error submitting task:', error);
            })
            .finally(() => {
                setShowModal(false);
                handleClear();
            });
    };

    const handleModalClose = () => setShowModal(false);

    const handleBasicChange = (e) => {
        const { name, value } = e.target;
        setBasicData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleExecutorChange = (index, e) => {
        const { name, value } = e.target;
    
        setExecutors(prevExecutors => {
            const updatedExecutors = [...prevExecutors];
            const updatedExecutor = { ...updatedExecutors[index] };
    
            if (name === "env") {
                updatedExecutor.env = value.split(' ');
            } else if (name === "command") {
                updatedExecutor.command = value.split(' ');
            } else {
                updatedExecutor[name] = value;
            }
    
            updatedExecutors[index] = updatedExecutor;
            return updatedExecutors;
        });
    };
    
    // Clear input boxes
    const handleClear = () => {
        setBasicData({name: "", description: ""});
        setExecutors([{image: "", command: [], workdir: "", stdout: "", stderr: "", env: []}]);
        setInputs([{ name: "", description: "", url: "", path: "", content: "", type: ""}]);
        setOutputs([{ name: "", description: "", url: "", path: "", type: ""}]);
        setResources([{ cpu_cores: "", zones: "", preemptible: false, disk_size: "", ram_size: "" }]);
        setTags({tag: []});
        setVolumes({path: []});
    };

    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        setInputs(inputs.map((input, i) =>
            i === index ? { ...input, [name]: value } : input
        ));
    };
    
    const handleOutputChange = (index, e) => {
        const { name, value } = e.target;
        setOutputs(outputs.map((output, i) =>
            i === index ? { ...output, [name]: value } : output
        ));
    };

    const handleResourceChange = (index, event) => {
        const { name, type, value, checked } = event.target;
        setResources(resources.map((resource, i) =>
            i === index ? { ...resource, [name]: type === "checkbox" ? checked : value } : resource
        ));
    };

    const addInputField = () => {
        const newInput = { name: "", description: "", url: "", path: "", content: "", type: ""};
        setInputs(prevInputs => [...prevInputs, newInput]);
    };

    const removeInputField = () => {
        setInputs(prevInputs => prevInputs.slice(0, -1));
    };

    const addOutputField = () => {
        const newInput = { name: "", description: "", url: "", path: "", type: "" };
        setOutputs(prevOutputs => [...prevOutputs, newInput]);
    };

    const removeOutputField = () => {
        setOutputs(prevOutputs => prevOutputs.slice(0, -1));
    };

    const handleTagsInputChange = (e) => {
        const { name, value } = e.target;
    
        setTags(prevTags => ({
            ...prevTags,
            [name]: value.split(' ')
        }));
    };
    

    const handleVolumeInputChange = (e) => {
        const { name, value } = e.target;
    
        setVolumes(prevVolumes => ({
            ...prevVolumes,
            [name]: value.split(' ')
        }));
    };
    

    return (
        <Container className="py-5">
            <Card className="border-0 shadow-sm rounded-3 mb-4">
                <Card.Body>
                    <p className="text-muted mb-4" style={{ fontSize: '0.875rem' }}>
                        *All fields marked with an asterisk (*) are required.
                    </p>
                    <Form onSubmit={handleSubmit}>
                        <Card className="border-0 shadow-sm rounded-3 mb-4">
                            <Card.Header className={`bg-primary text-white py-3 ${activeKey === "0" ? "border-bottom" : ""}`}>
                                Basic Information
                            </Card.Header>
                            <Card.Body>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="3" className="fw-bold">
                                        Name <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Col sm="9">
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={basicData.name}
                                            onChange={handleBasicChange}
                                            placeholder="Type name..."
                                            required
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="3" className="fw-bold">
                                        Description
                                    </Form.Label>
                                    <Col sm="9">
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            name="description"
                                            value={basicData.description}
                                            onChange={handleBasicChange}
                                            placeholder="Enter a detailed description..."
                                        />
                                    </Col>
                                </Form.Group>
                            </Card.Body>
                        </Card>

                        {executors.map((executor, index) => (
                            <Card className="border-0 shadow-sm rounded-3 mb-4" key={index}>
                                <Card.Header className={`bg-primary text-white py-3`}>
                                    Executor Information
                                </Card.Header>
                                <Card.Body>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="3" className="fw-bold">
                                            Image <span className="text-danger">*</span>
                                        </Form.Label>
                                        <Col sm="9">
                                            <Form.Control
                                                type="text"
                                                name="image"
                                                value={executor.image}
                                                onChange={(e) => handleExecutorChange(index, e)}
                                                placeholder="Type image path..."
                                                required
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="3" className="fw-bold">
                                            Command <span className="text-danger">*</span>
                                        </Form.Label>
                                        <Col sm="9">
                                            <Form.Control
                                                type="text"
                                                name="command"
                                                value={executor.command.join(' ')}
                                                onChange={(e) => handleExecutorChange(index, e)}
                                                placeholder="Type command..."
                                                required
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="3" className="fw-bold">
                                            Working Directory
                                        </Form.Label>
                                        <Col sm="9">
                                            <Form.Control
                                                type="text"
                                                name="workdir"
                                                value={executor.workdir}
                                                onChange={(e) => handleExecutorChange(index, e)}
                                                placeholder="Type working directory..."
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="3" className="fw-bold">
                                            Stdout
                                        </Form.Label>
                                        <Col sm="9">
                                            <Form.Control
                                                type="text"
                                                name="stdout"
                                                value={executor.stdout}
                                                onChange={(e) => handleExecutorChange(index, e)}
                                                placeholder="Type stdout..."
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="3" className="fw-bold">
                                            Stderr
                                        </Form.Label>
                                        <Col sm="9">
                                            <Form.Control
                                                type="text"
                                                name="stderr"
                                                value={executor.stderr}
                                                onChange={(e) => handleExecutorChange(index, e)}
                                                placeholder="Type stderr..."
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="3" className="fw-bold">
                                            Env
                                        </Form.Label>
                                        <Col sm="9">
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip id={`tooltip-env`}>Please type key=value pairs with the following format: KEY1=VALUE1 KEY2=VALUE2</Tooltip>}
                                            >
                                                <Form.Control
                                                    type="text"
                                                    name="env"
                                                    value={executor.env.join(' ')}
                                                    onChange={(e) => handleExecutorChange(index, e)}
                                                    placeholder="Type environmental vars, separated with space..."
                                                />
                                            </OverlayTrigger>
                                        </Col>
                                    </Form.Group>
                                </Card.Body>
                            </Card>
                        ))}

                        <Accordion activeKey={activeKey} onSelect={handleToggle} className="mb-4">
                            {/* Inputs */}
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    Inputs Information (Optional)
                                </Accordion.Header>
                                <Accordion.Body>
                                    {inputs.map((input, index) =>  (
                                        <div key={index} className="mb-4">
                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm="3" className="fw-bold">
                                                    Name
                                                </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control
                                                        type="text"
                                                        name="name"
                                                        value={input.name}
                                                        onChange={(e) => handleInputChange(index, e)}
                                                        placeholder="Type name..."
                                                    />
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm="3" className="fw-bold">
                                                    Description
                                                </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={2}
                                                        name="description"
                                                        value={input.description}
                                                        onChange={(e) => handleInputChange(index, e)}
                                                        placeholder="Type description..."
                                                    />
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm="3" className="fw-bold">
                                                    URL
                                                </Form.Label>
                                                <Col sm="8">
                                                    <OverlayTrigger
                                                        placement="top"
                                                        overlay={<Tooltip>Please omit URL, if content is defined.</Tooltip>}
                                                    >
                                                        <Form.Control
                                                            type="text"
                                                            name="url"
                                                            value={input.url}
                                                            onChange={(e) => handleInputChange(index, e)}
                                                            placeholder="Type URL..."
                                                        />
                                                    </OverlayTrigger>
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm="3" className="fw-bold">
                                                    Path <span className="text-danger">*</span>
                                                </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control
                                                        type="text"
                                                        name="path"
                                                        value={input.path}
                                                        onChange={(e) => handleInputChange(index, e)}
                                                        placeholder="Type path..."
                                                    />
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm="3" className="fw-bold">
                                                    Content
                                                </Form.Label>
                                                <Col sm="8">
                                                    <OverlayTrigger
                                                        placement="top"
                                                        overlay={<Tooltip>Please omit Content, if URL is defined.</Tooltip>}
                                                    >
                                                        <Form.Control
                                                            type="text"
                                                            name="content"
                                                            value={input.content}
                                                            onChange={(e) => handleInputChange(index, e)}
                                                            placeholder="Type content..."
                                                        />
                                                    </OverlayTrigger>
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm="3" className="fw-bold">
                                                    Type
                                                </Form.Label>
                                                <Col sm="8">
                                                    <Form.Select
                                                        name="type"
                                                        value={input.type}
                                                        onChange={(e) => handleInputChange(index, e)}
                                                    >
                                                        <option value="">Select Type</option>
                                                        <option value="FILE">FILE</option>
                                                        <option value="DIRECTORY">DIRECTORY</option>
                                                    </Form.Select>
                                                </Col>
                                            </Form.Group>
                                        </div>
                                    ))}
                                    <div className="d-flex justify-content-start gap-2 mt-4">
                                        <Button variant="primary" onClick={addInputField}>
                                            <FontAwesomeIcon icon={faPlus} className="me-2" />
                                            Add
                                        </Button>
                                        <Button 
                                            variant="danger" 
                                            onClick={() => removeInputField(inputs[inputs.length - 1]?.id)}
                                            disabled={inputs.length === 1}
                                        >
                                            <FontAwesomeIcon icon={faXmark} className="me-2" />
                                            Remove
                                        </Button>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>

                            {/* Outputs */}
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>
                                    Outputs Information (Optional)
                                </Accordion.Header>
                                <Accordion.Body>
                                    {outputs.map((output, index) => (
                                        <div key={index} className="mb-4">
                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm="3" className="fw-bold">
                                                    Name
                                                </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control
                                                        type="text"
                                                        name="name"
                                                        value={output.name}
                                                        onChange={(e) => handleOutputChange(index, e)}
                                                        placeholder="Type name..."
                                                    />
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm="3" className="fw-bold">
                                                    Description
                                                </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={2}
                                                        name="description"
                                                        value={output.description}
                                                        onChange={(e) => handleOutputChange(index, e)}
                                                        placeholder="Type description..."
                                                    />
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm="3" className="fw-bold">
                                                    URL <span className="text-danger">*</span>
                                                </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control
                                                        type="text"
                                                        name="url"
                                                        value={output.url}
                                                        onChange={(e) => handleOutputChange(index, e)}
                                                        placeholder="Type URL..."
                                                    />
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm="3" className="fw-bold">
                                                    Path <span className="text-danger">*</span>
                                                </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control
                                                        type="text"
                                                        name="path"
                                                        value={output.path}
                                                        onChange={(e) => handleOutputChange(index, e)}
                                                        placeholder="Type path..."
                                                    />
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm="3" className="fw-bold">
                                                    Type
                                                </Form.Label>
                                                <Col sm="8">
                                                    <Form.Select
                                                        name="type"
                                                        value={output.type}
                                                        onChange={(e) => handleOutputChange(index, e)}
                                                    >
                                                        <option value="">Select Type</option>
                                                        <option value="FILE">FILE</option>
                                                        <option value="DIRECTORY">DIRECTORY</option>
                                                    </Form.Select>
                                                </Col>
                                            </Form.Group>
                                        </div>
                                    ))}
                                    <div className="d-flex justify-content-start gap-2 mt-4">
                                        <Button variant="primary" onClick={addOutputField}>
                                            <FontAwesomeIcon icon={faPlus} className="me-2" />
                                            Add
                                        </Button>
                                        <Button 
                                            variant="danger" 
                                            onClick={() => removeOutputField(inputs[outputs.length - 1]?.id)}
                                            disabled={outputs.length === 1}
                                        >
                                            <FontAwesomeIcon icon={faXmark} className="me-2" />
                                            Remove
                                        </Button>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>

                            {/* Volumes */}
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>
                                    Volumes Information (Optional)
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="3" className="fw-bold">
                                            Paths
                                        </Form.Label>
                                        <Col sm="9">
                                            <Form.Control
                                                type="text"
                                                name="path"
                                                value={volumes.path.join(' ')}
                                                onChange={handleVolumeInputChange}
                                                placeholder="Type paths, separated with space..."
                                            />
                                        </Col>
                                    </Form.Group>
                                </Accordion.Body>
                            </Accordion.Item>

                            {/* Resources */}
                            <Accordion.Item eventKey="3">
                                <Accordion.Header>
                                    Resources Information (Optional)
                                </Accordion.Header>
                                <Accordion.Body>
                                    {resources.map((resource, index) => (
                                        <div key={index} className="mb-4">                                          
                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm="3" className="fw-bold">
                                                    CPU cores
                                                </Form.Label>
                                                <Col sm="8">
                                                    <Form.Select
                                                        name="cpu_cores"
                                                        value={resource.cpu_cores}
                                                        onChange={(e) => handleResourceChange(index, e)}
                                                    >
                                                        <option value="">Select Cores</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="4">4</option>
                                                    </Form.Select>
                                                </Col>
                                            </Form.Group>
                                            
                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm="3" className="fw-bold">
                                                    RAM (Gb)
                                                </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control
                                                        type="number"
                                                        name="ram_size"
                                                        step="0.1"
                                                        min="1.0"
                                                        value={resource.ram_size}
                                                        onChange={(e) => handleResourceChange(index, e)}
                                                        placeholder="Select RAM size (in Gbytes)..."
                                                        
                                                    />
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm="3" className="fw-bold">
                                                    Disk (Gb)
                                                </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control
                                                        type="number"
                                                        name="disk_size"
                                                        step="0.1"
                                                        min="5.0"
                                                        value={resource.disk_size}
                                                        onChange={(e) => handleResourceChange(index, e)}
                                                        placeholder="Select Disk size (in Gbytes)..."
                                                    />
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm="3" className="fw-bold">
                                                    Zones
                                                </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control
                                                        type="text"
                                                        name="zones"
                                                        value={resource.zones}
                                                        onChange={(e) => handleResourceChange(index, e)}
                                                        placeholder="Type zones..."
                                                    />
                                                </Col>
                                            </Form.Group>


                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm="3" className="fw-bold">
                                                    Preemptible
                                                </Form.Label>
                                                <Col sm="8">
                                                    <div className="form-check form-switch">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="preemptibleSwitch"
                                                            name="preemptible"
                                                            checked={resource.preemptible}
                                                            onChange={(e) => handleResourceChange(index, e)}
                                                        />
                                                    </div>
                                                </Col>
                                            </Form.Group>
                                        </div>
                                    ))}

                                </Accordion.Body>
                            </Accordion.Item>

                            {/* Tags */}
                            <Accordion.Item eventKey="4">
                                <Accordion.Header>
                                    Tags Information (Optional)
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="3" className="fw-bold">
                                            Tags
                                        </Form.Label>
                                        <Col sm="9">
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip id={`tooltip-tags`}>Please type key=value pairs with the following format: KEY1=VALUE1 KEY2=VALUE2</Tooltip>}
                                            >
                                                <Form.Control
                                                    type="text"
                                                    name="tag"
                                                    value={tags.tag.join(' ')}
                                                    onChange={handleTagsInputChange}
                                                    placeholder="Type tags, separated by space..."
                                                />
                                            </OverlayTrigger>
                                        </Col>
                                    </Form.Group>
                                </Accordion.Body>
                            </Accordion.Item>

                        </Accordion>

                        <div className="d-flex justify-content-end mt-4">
                            <Button variant="primary" className="me-2" onClick={handleClear}>
                                Clear All
                            </Button>
                            <Button variant="danger" className="me-2" onClick={() => navigate("/Dashboard")}>
                                Back
                            </Button>
                            <Button variant="success" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                    
                    <Modal show={showModal} onHide={handleModalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Task Information</Modal.Title>
                        </Modal.Header>
                            <Modal.Footer>
                            <p>Please confirm that you want to submit the <span className="fw-bold">{basicData.name}</span> task with the following details?</p>
                            <Button variant="danger" onClick={handleModalClose}>
                                Cancel
                            </Button>
                            <Button variant="success" onClick={handleConfirmSubmit}>
                                Confirm
                            </Button>
                        </Modal.Footer>
                        <Modal.Body>
                            <pre>{JSON.stringify({ name: basicData.name, description: basicData.description, executors, inputs, outputs, volumes, resources, tags }, null, 2)}</pre>
                        </Modal.Body>
                    </Modal>
                    
                </Card.Body>
            </Card>
        </Container>
    );
};

export default TaskForm;
