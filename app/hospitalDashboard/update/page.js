
"use client";
import { useState } from 'react';

export default function RegionalAddBlood() {
    const [bloodID, setserialID] = useState('');
    const [hospitalID, sethospitalID] = useState('');
    const [patientUserID, setpatientUserID] = useState('');
    const [patientNumber, setpatientNumber] = useState('');
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/hospitalDashboard/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bloodID,
                    hospitalID,
                    patientUserID,
                    patientNumber,
                    status,

                    sourceType: 'hospital' // Specify the source type
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage({ type: "success", text: data.message });
                // window.location.href = '/';

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
                    <label>Hospital ID</label>
                    <input type="text" value={hospitalID} onChange={e => sethospitalID(e.target.value)} required />
                </div>

                <div>
                    <label>Patient User ID</label>
                    <input type="text" value={patientUserID} onChange={e => setpatientUserID(e.target.value)} required />
                </div>

                <div>
                    <label>Patient Number</label>
                    <input type="text" value={patientNumber} onChange={e => setpatientNumber(e.target.value)} required />
                </div>

                <div>
                    <label>Status</label>
                    <select value={status} onChange={e => setStatus(e.target.value)} required>
                        <option value="compatible">Compatible</option>
                        <option value="incompatible">Incompatible</option>
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