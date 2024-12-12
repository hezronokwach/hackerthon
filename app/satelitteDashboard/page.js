"use-client";

import { useState } from 'react';

const DonorForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [satelliteId, setSatelliteId] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const donorData = {
            firstName,
            lastName,
            email,
            phoneNumber,
            satelliteId: parseInt(satelliteId), // Ensure satelliteId is a number
        };

        try {
            const response = await fetch('/api/donateblood', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(donorData),
            });

            const data = await response.json();
            setResponseMessage(data.message);
            if (response.ok) {
                // Reset form fields
                setFirstName('');
                setLastName('');
                setEmail('');
                setPhoneNumber('');
                setSatelliteId('');
            }
        } catch (error) {
            console.error('Error:', error);
            setResponseMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="donor-form">
            <h1>Donate Blood</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <div>
                    <label>Satellite ID:</label>
                    <input type="number" value={satelliteId} onChange={(e) => setSatelliteId(e.target.value)} required />
                </div>
                <button type="submit">Submit Donation</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default DonorForm;
