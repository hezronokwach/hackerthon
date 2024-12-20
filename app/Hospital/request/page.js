   "use client";
import { useState } from 'react';

export default function HospitalRequest() {
    const [RequestedBY, setRequestedBy] = useState('');
    const [UserID, setUserID] = useState('');
    const [HospitalID, setHospitalID] = useState('');
    const [BloodType, setBloodType] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        try {
            const response = await fetch('http://localhost:3000/Hospital/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({RequestedBY,UserID,HospitalID,BloodType}),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: "success", text: data.message });
                setTimeout(() => {
                    window.location.href = '/request'; // Redirect using window.location
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
                    <label>RequestedBY</label>
                    <input type="text" value={RequestedBY} onChange={e => setRequestedBy(e.target.value)} required />
                </div>
                <div>
                    <label>UserID</label>
                    <input type="text" value={UserID} onChange={e => setUserID(e.target.value)} required />
                </div>
                <div>
                    <label>HospitalID</label>
                    <input type="text" value={HospitalID} onChange={e => setHospitalID(e.target.value)} required />
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