import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLocationPin } from '@fortawesome/free-solid-svg-icons';
import { faXTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

// Placeholder images for members
import placeholderImage from '../img/about_us/about-us-landing-page-template.png';

const TeamMemberCard = ({ name, role, image, twitter, linkedin, email }) => {
    return (
        <Card className="text-center mb-4 shadow-sm border-light rounded">
            <Card.Body>
                <Image 
                    src={image || placeholderImage} 
                    alt={`${name || 'Team Member'}'s picture`} 
                    roundedCircle 
                    className="mb-3"
                    style={{ width: '150px', height: '150px' }}
                />
                <Card.Title className="mb-2">{name || 'Name Placeholder'}</Card.Title>
                <Card.Text className="text-muted">{role || 'Role Placeholder'}</Card.Text>
                <div className="d-flex justify-content-center">
                    {twitter && <a href={twitter} className="mx-2 text-decoration-none text-muted"><FontAwesomeIcon icon={faXTwitter} size="lg" /></a>}
                    {linkedin && <a href={linkedin} className="mx-2 text-decoration-none text-muted"><FontAwesomeIcon icon={faLinkedin} size="lg" /></a>}
                    {email && <a href={`mailto:${email}`} className="mx-2 text-decoration-none text-muted"><FontAwesomeIcon icon={faEnvelope} size="lg" /></a>}
                </div>
            </Card.Body>
        </Card>
    );
};

const AboutusTemplate = () => {
    const teamMembers = [
        { name: 'Name Placeholder', role: 'Role Placeholder', image: placeholderImage, twitter: '', linkedin: '', email: '' },
        { name: 'Name Placeholder', role: 'Role Placeholder', image: placeholderImage, twitter: '', linkedin: '', email: '' },
        { name: 'Name Placeholder', role: 'Role Placeholder', image: placeholderImage, twitter: '', linkedin: '', email: '' },
    ];

    const formerteamMembers = [
        { name: 'Name Placeholder', role: 'Role Placeholder', image: placeholderImage, twitter: '', linkedin: '', email: '' },
        { name: 'Name Placeholder', role: 'Role Placeholder', image: placeholderImage, twitter: '', linkedin: '', email: '' },
    ];

    return (
        <Container className="mt-5">
            <h1 className="display-6 text-center mb-2">Publication Placeholder</h1>
            <Card className="text-center mb-5 shadow-sm border-light rounded">
                <Card.Body>
                    <Card.Text className="text-muted">
                        Author Name 1, Author Name 2, Author Name 3, and others. Year.
                        <b> Publication Title Placeholder. </b>
                        In Conference Name Placeholder. 
                        Publishing Organization Placeholder, Location Placeholder, Page Numbers Placeholder.
                        <a href="#" className="d-block text-dark mt-2"> 
                            Link Placeholder
                        </a>
                    </Card.Text>     
                </Card.Body>
            </Card>

            <h1 className="display-6 text-center mb-4">About Us</h1>
            <Row className="justify-content-center">
                {teamMembers.map((member, index) => (
                    <Col xs={12} sm={6} md={4} lg={3} key={index} className="d-flex justify-content-center mb-4">
                        <TeamMemberCard 
                            name={member.name} 
                            role={member.role} 
                            image={member.image} 
                            twitter={member.twitter}
                            linkedin={member.linkedin}
                            email={member.email}
                        />
                    </Col>
                ))}
            </Row>

            <h1 className="display-6 text-center mb-4">Former Members</h1>
            <Row className="justify-content-center">
                {formerteamMembers.map((member, index) => (
                    <Col xs={12} sm={6} md={4} lg={3} key={index} className="d-flex justify-content-center mb-4">
                        <TeamMemberCard 
                            name={member.name} 
                            role={member.role} 
                            image={member.image} 
                            twitter={member.twitter}
                            linkedin={member.linkedin}
                            email={member.email}
                        />
                    </Col>
                ))}
            </Row>

            <Row className="justify-content-center mt-4">
                <Col md={6} className="text-center">
                    <h2 className="display-6">Contact Us Placeholder</h2>
                    <p className="mb-2"> <FontAwesomeIcon icon={faEnvelope} /><b> Email: </b> 
                        <a href="mailto:email-placeholder@domain.com" className="text-decoration-none"> 
                             email-placeholder@domain.com
                        </a>
                    </p>
                    <p className="mb-4"><FontAwesomeIcon icon={faLocationPin} /> 
                    <b> Address: </b> Address Placeholder, City Placeholder, Zip Code Placeholder, Country Placeholder</p>
                    <div className="embed-responsive embed-responsive-16by9 mb-5">
                        <iframe
                            className="embed-responsive-item"
                            src="https://www.google.com/maps/embed?pb=Placeholders"
                            allowFullScreen
                            title="Google Maps Placeholder"
                            referrerPolicy="no-referrer-when-downgrade"
                            style={{ border: 0, width: '100%', height: '400px' }} 
                        ></iframe>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default AboutusTemplate;
