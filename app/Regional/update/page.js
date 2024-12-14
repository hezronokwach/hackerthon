"use client";
import { useState } from 'react';

export default function HospitalUpdate() {
    const [SerialID, setSerialID] = useState('');
    const [BloodType, setBloodType] = useState('');
    const [StatusMessage, setStatusMessage] = useState('');
    const [ContactPerson, setContactPerson] = useState('');
    const [ContactEmail, setContactEmail] = useState('');
    // const [BloodType, setBloodType] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        try {
            const response = await fetch('http://localhost:3000/Regional/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({SerialID,BloodType,StatusMessage,ContactEmail,ContactPerson}),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: "success", text: data.message });
                setTimeout(() => {
                    window.location.href = '/update'; // Redirect using window.location
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
                    <input type="text" value={SerialID} onChange={e => setSerialID(e.target.value)} required />
                </div>
                <div>
                    <label>ContactPerson</label>
                    <input type="text" value={ContactPerson} onChange={e => setContactPerson(e.target.value)} required />
                </div>
                <div>
                    <label>ContactEmail</label>
                    <input type="text" value={ContactEmail} onChange={e => setContactEmail(e.target.value)} required />
                </div>
                <div>
                    <label>StatusMessage</label>
                    <input type="text" value={StatusMessage} onChange={e => setStatusMessage(e.target.value)} required />
                </div>
                <div>
                    <label>BloodType</label>
                    <input type="text" value={BloodType} onChange={e => setBloodType(e.target.value)} required />
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