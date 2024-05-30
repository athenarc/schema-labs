import React, { useEffect, useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { formalize } from "../../utils/text";
import isEqual from "lodash/isEqual";
import { useTaskFilters } from "./TasksListProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const TasksFilterControls = () => {
    const [show, setShow] = useState(false);
    const [showFixedFilterButton, setShowFixedFilterButton] = useState(false);

    const elementRef = useRef(null);

    // Add listener for fixed filter button to appear when static one is invisible
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setShowFixedFilterButton(false);
                } else {
                    setShowFixedFilterButton(true);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0
        });

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, []);

    return <Row>
        <Col xs={6}>

        </Col>
        <Col xs={6} className="text-end">
            <Button ref={elementRef} variant="primary" onClick={()=>setShow(true)} className="rounded-pill">Filters <FontAwesomeIcon icon={faFilter} /></Button>
            <Button variant="primary" onClick={()=>setShow(true)} className={"rounded-pill position-fixed bottom-0 start-50 translate-middle-x mb-5" + (showFixedFilterButton ? "" : " d-none")} >Filters <FontAwesomeIcon icon={faFilter} /></Button>
            <TasksFilterForm show={show} hideCallback={()=>setShow(false)} />
        </Col>
    </Row>;
}

const TasksFilterForm = ({ show, hideCallback }) => {
    const { taskFilters, setTaskFilters } = useTaskFilters();
    const [token, setToken] = useState(taskFilters.token);
    const [statuses, setStatuses] = useState({ ...(taskFilters.statuses) });

    const StatusCheckOption = ({ status }) => <Form.Check
        type={"checkbox"} id={`${status}`}
        label={formalize(status)}
        onChange={evt => setStatuses({ ...statuses, [status]: evt.target.checked })}
        checked={!!statuses[status]}
    />;

    const handleNameInput = evt => {
        setToken(evt.target.value);
    }

    const handleApplyFilters = () => {
        setTaskFilters({
            ...taskFilters,
            token,
            statuses: { ...statuses }
        });
        hideCallback();
    }

    const resetFilters = () => {
        setToken(taskFilters.token);
        setStatuses({ ...(taskFilters.statuses) });
    }

    const handleCloseFilters = () => {
        resetFilters();
        hideCallback();
    }

    const haveFiltersBeenAltered = () => {
        return token !== taskFilters.token || !isEqual(statuses, { ...(taskFilters.statuses || {}) });
    }

    return <Offcanvas show={show} onHide={handleCloseFilters}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Container>
                <Form>
                    <Form.Group as={Row} className="mb-4" controlId="taskName">
                        <Col>
                            <Form.Label>Name/UUID</Form.Label>
                            <div className="ps-3">
                                <Form.Control type="text" value={token} onInput={handleNameInput} />
                            </div>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-4" controlId="status">
                        <Col>
                            <Form.Label>Status</Form.Label>
                            <div className="ps-3">
                                {/* <Form.Check type={"checkbox"} id={`submitted`} label={`Submitted`} /> */}
                                <StatusCheckOption status='submitted' />
                                <StatusCheckOption status='approved' />
                                <StatusCheckOption status='scheduled' />
                                <StatusCheckOption status='running' />
                                <StatusCheckOption status='completed' />
                                <StatusCheckOption status='error' />
                                <StatusCheckOption status='canceled' />
                                <StatusCheckOption status='rejected' />
                                <StatusCheckOption status='unknown' />
                            </div>
                        </Col>
                    </Form.Group>
                    <Button onClick={handleApplyFilters} disabled={!haveFiltersBeenAltered()}>Apply filters</Button>
                </Form>
            </Container>
        </Offcanvas.Body>
    </Offcanvas>

}

export default TasksFilterControls;