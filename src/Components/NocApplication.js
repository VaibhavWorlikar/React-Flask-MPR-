import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import nocbackground from '../images/nocbackground.jpg';

const NOCApplication = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        address: '',
        reason: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to the server)
        alert('NOC Application Submitted!');
    };

    return (
        <PageContainer id="noc-application">
            <ContentContainer>
                <Title>Apply for Fire NOC</Title>
                <FormContainer>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label >Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formContact">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your contact number"
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formReason">
                            <Form.Label>Reason for NOC</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Describe the reason for your NOC application"
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <SubmitButton variant="primary" type="submit">
                            Apply Now
                        </SubmitButton>
                    </Form>
                </FormContainer>
            </ContentContainer>
        </PageContainer>
    );
};

// Styled components (ensure these are included)
const PageContainer = styled.div`
margin-top: 50px;
    display: flex;
    z-index: -4;
    justify-content: left;
    align-items: center;
    height: 100vh;
    background-image: url(${nocbackground});  
    background-size: cover;
    background-position: center;
    position: relative;
    background
`;
const ContentContainer = styled.div`
    width: 100%;
    max-width: 600px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0);
    justify-content: left !important;
`;

const FormContainer = styled.div`
    width: 100%;
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
    color: #fff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Add shadow to the text */
`;

const SubmitButton = styled(Button)`
    margin-top: 20px;
    width: 100%;
    padding: 10px;
    font-size: 16px;
    background-color: #fe6434;
    border: none;
    border-radius: 5px;

    &:hover {
        background-color: #e5532d;
    }
`;

export default NOCApplication;
