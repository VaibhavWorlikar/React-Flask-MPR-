import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import bgImage from '../images/bookdrill.jpg'; // Background image

const BookFireDrill = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        date: '',
        time: '',
        location: ''
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
        alert('Fire Drill Booking Submitted!');
    };

    return (
        <PageContainer id='fire-drill'>
            <FormContainer>
                <Title>Book a Fire Drill</Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
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
                    <Form.Group controlId="formDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formTime">
                        <Form.Label>Time</Form.Label>
                        <Form.Control
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formLocation">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter the location for the drill"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <SubmitButton variant="primary" type="submit">
                        Book Now
                    </SubmitButton>
                </Form>
            </FormContainer>
        </PageContainer>
    );
};

const PageContainer = styled.div`
    display: flex;
    justify-content: right;
    align-items: center;
    height: 100vh; /* Full viewport height */
    background-image: url(${bgImage}); /* Background image */
    background-size: cover;
    background-position: center;
`;

const FormContainer = styled.div`
    max-width: 600px;
    width: 100%;
    margin-right:45px;
    padding: 40px;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.6); /* Semi-transparent background */
    backdrop-filter: blur(10px); /* Optional: Adds a blur effect to the background */
    z-index: 1; /* Ensure form appears above background */
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
    color: black;
    font-size: 45px;
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

export default BookFireDrill;
