"use client";
import { useState } from 'react';

export default function EmergencyBloodRequest() {
    const [showForm, setShowForm] = useState(false);
    const [bloodType, setBloodType] = useState('');
    const [hospitalID, setHospitalID] = useState('');
    const [regionalID, setRegionalID] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/hospitalDashboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bloodType,
                    hospitalID,
                    regionalID,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage({ type: "success", text: data.message });
            } else {
                setMessage({ type: "error", text: data.message });
            }
        } catch (error) {
            console.error(error);
            setMessage({ type: "error", text: "An error occurred. Please try again." });
        }
    };

    return (
        <>
            <button onClick={() => setShowForm(!showForm)}>
                Emergency Request
            </button>
            {showForm && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Blood Type</label>
                        <select value={bloodType} onChange={e => setBloodType(e.target.value)} required>
                            <option value="">Select Blood Type</option>
                            <option value="All">All</option>                            
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                    <div>
                        <label>Hospital ID</label>
                        <input type="text" value={hospitalID} onChange={e => setHospitalID(e.target.value)} required />
                    </div>
                    <div>
                        <label>Regional ID</label>
                        <input type="text" value={regionalID} onChange={e => setRegionalID(e.target.value)} required />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            )}
            {message && (
                <p
                    style={{
                        color: message.type === "success" ? "green" : "red",
                        marginTop: "10px",
                    }}
                >
                    {message.text}
                </p>
            )}
        </>
    );
}