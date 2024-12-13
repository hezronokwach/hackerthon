"use client";
import { useState } from 'react';

export default function RegionalUpdateBlood() {
    const [bloodID, setserialID] = useState('');
    const [regionalID, setregionalID] = useState('');
    const [bloodType, setbloodType] = useState('');
    const [status, setStatus] = useState('healthy'); // Default to 'healthy'
    const [message, setMessage] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/regional/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bloodID,
                    regionalID,
                    bloodType,
                    status,
                    sourceType: 'regional'
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage({ type: "success", text: data.message });
            } else {
                setMessage({ type: "error", text: data.message });
            }
        } catch (error) {
            setMessage({ type: "error", text: "An error occurred. Please try again." });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Blood serial ID</label>
                    <input type="text" value={bloodID} onChange={e => setserialID(e.target.value)} required />
                </div>
                <div>
                    <label>RegionalID</label>
                    <input type="text" value={regionalID} onChange={e => setregionalID(e.target.value)} required />
                </div>
                <div>
                    <label>Blood Type</label>
                    <input type="text" value={bloodType} onChange={e => setbloodType(e.target.value)} required />
                </div>
                <div>
                    <label>Status</label>
                    <select value={status} onChange={e => setStatus(e.target.value)} required>
                        <option value="healthy">Healthy</option>
                        <option value="discarded">Discarded</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
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