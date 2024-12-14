"use client";
import { useState } from 'react';

export default function SatelitteAdd() {
    const [SerialID, setSerialID] = useState('');
    const [SatelitteID, setSatelitteID] = useState('');
    const [SatelitteName, setSatelitteName] = useState('');
    const [ContactPerson, setContactPerson] = useState('');
    const [ContactEmail, setContactEmail] = useState('');
    // const [BloodType, setBloodType] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        try {
            const response = await fetch('http://localhost:3000/Satellite/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({SerialID,SatelitteID,SatelitteName,ContactEmail,ContactPerson}),
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
                {/* <div>
                    <label>StatusMessage</label>
                    <input type="text" value={StatusMessage} onChange={e => setStatusMessage(e.target.value)} required />
                </div> */}
                <div>
                    <label>SatelitteName</label>
                    <input type="text" value={SatelitteName} onChange={e => setSatelitteName(e.target.value)} required />
                </div>
                <div>
                    <label>SatelitteID</label>
                    <input type="text" value={SatelitteID} onChange={e => setSatelitteID(e.target.value)} required />
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