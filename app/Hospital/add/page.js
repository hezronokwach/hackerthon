
"use client";
import { useState } from 'react';

export default function HospitalAdd() {
    const [serialID, setserialID] = useState('');
    const [userID, setUserID] = useState('');
    const [HospitalID, setHospitalID] = useState('');
    const [patientNumber, setPatientID] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        try {
            const response = await fetch('http://localhost:3000/Hospital/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({serialID,userID,HospitalID,patienNumber}),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: "success", text: data.message });
                setTimeout(() => {
                    window.location.href = '/add'; // Redirect using window.location
                }, 1000);
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
                    <label>SerialID</label>
                    <input type="text" value={serialID} onChange={e => setserialID(e.target.value)} required />
                </div>
                <div>
                    <label>userID</label>
                    <input type="text" value={userID} onChange={e => setUserID(e.target.value)} required />
                </div>
                <div>
                    <label>HospitalID</label>
                    <input type="text" value={HospitalID} onChange={e => setHospitalID(e.target.value)} required />
                </div>
                <div>
                    <label>patientNumber</label>
                    <input type="text" value={patientNumber} onChange={e => setPatientID(e.target.value)} required />
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