import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import WelcomeCard from "./layouts/WelcomeMessage";
import welcome_img from './img/welcome.png';

const Home = () => {
    return <div>
        <Row className="justify-content-center p-1">
            <Col className="border border-light-subtle rounded p-4">
                <Row>
                    <Col className="border-end border-muted-subtle"><WelcomeCard /></Col>
                    <Col className="d-flex justify-content-center align-items-center"> 
                    <Image
                                src={welcome_img} 
                                alt="Welcome to SCHEMA lab"
                                fluid 
                                style={{
                                    maxWidth: '80%', 
                                    height: 'auto',
                                    filter: 'brightness(0.9) contrast(1.2) saturate(1.5) sepia(0.2)',
                                    borderRadius: '8px',
                                }}
                            />
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>;
}

export default Home;