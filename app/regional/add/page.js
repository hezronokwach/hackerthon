
"use client";
import { useState } from 'react';

export default function Regional() {
    const [userID, setserialID] = useState('');
    const [regionalID, setregionalID] = useState('');

    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState(null);
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:3000/regional/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userID,
                regionalID,
                date,
                status,
                sourceType: 'regional' // Specify the source type
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
                    <label>serialID</label>
                    <input type="text" value={userID} onChange={e => setserialID(e.target.value)} required />
                </div>
                <div>
                    <label>RegionalId</label>
                    <input type="text" value={regionalID} onChange={e => setregionalID(e.target.value)} required />
                </div>
                <div>
                    <label>Date</label>
                    <input type="text" value={date} onChange={e => setDate(e.target.value)} required />
                </div>
                <div>
                    <label>Status</label>
                    <input type="text" value={status} onChange={e => setStatus(e.target.value)} required />
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