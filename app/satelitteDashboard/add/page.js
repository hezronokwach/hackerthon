"use client";

import { useState } from 'react';


export default function DonorForm() {
    const [userID, setuserID] = useState('');
    const [donationDate, setdonationDate] = useState('');
    const [bloodType, setbloodType] = useState('');
    const [status, setstatus] = useState('');
    const [satelliteId, setSatelliteId] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/satelitteDashboard/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userID,
                    donationDate,
                    bloodType,
                    status,
                    satelliteId
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setResponseMessage({ type: "success", text: "Donation recorded successfully!" });
                setTimeout(() => {
                    window.location.href = `/donorPage/${userID}`;
                }, 1000);
            }
        } catch (error) {
            console.error('Error:', error);
            setResponseMessage('An error occurred. Please try again.');
        }
    };

    return (
        <>
            <h1>Donate Blood</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User ID:</label>
                    <input type="text" value={userID} onChange={(e) => setuserID(e.target.value)} required />
                </div>
                <div>
                    <label>Donation Date:</label>
                    <input type="text" value={donationDate} onChange={(e) => setdonationDate(e.target.value)} required />
                </div>
                <div>
                    <label>BloodType:</label>
                    <input type="text" value={bloodType} onChange={(e) => setbloodType(e.target.value)} required />
                </div>
                <div>
                    <label>Status:</label>
                    <input type="text" value={status} onChange={(e) => setstatus(e.target.value)} />
                </div>
                <div>
                    <label>Satellite ID:</label>
                    <input type="text" value={satelliteId} onChange={(e) => setSatelliteId(e.target.value)} required />
                </div>
                <button type="submit">Submit Donation</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </>
    );
};

