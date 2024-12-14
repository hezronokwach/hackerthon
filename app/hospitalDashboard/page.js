"use client";
import { useState } from 'react';

export default function BloodRequestForms() {
    const [showEmergencyForm, setShowEmergencyForm] = useState(false);
    const [showHospitalForm, setShowHospitalForm] = useState(false);
    
    // Emergency form states
    const [bloodType, setBloodType] = useState('');
    const [hospitalID, setHospitalID] = useState('');
    const [regionalID, setRegionalID] = useState('');
    
    // Hospital request form states
    const [hospitalRequestData, setHospitalRequestData] = useState({
        hospitalID: '',
        bloodType: '',
        requestedBy: ''
    });
    
    const [message, setMessage] = useState(null);

    const handleEmergencySubmit = async (e) => {
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

    const handleHospitalRequestSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/hospitalRequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(hospitalRequestData),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage({ type: "success", text: data.message });
                setHospitalRequestData({
                    hospitalID: '',
                    bloodType: '',
                    requestedBy: ''
                });
                setShowHospitalForm(false);
            } else {
                setMessage({ type: "error", text: data.message });
            }
        } catch (error) {
            console.error(error);
            setMessage({ type: "error", text: "An error occurred. Please try again." });
        }
    };

    const handleHospitalRequestChange = (e) => {
        const { name, value } = e.target;
        setHospitalRequestData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button onClick={() => {
                    setShowEmergencyForm(!showEmergencyForm);
                    setShowHospitalForm(false);
                }}>
                    Emergency Request
                </button>
                <button onClick={() => {
                    setShowHospitalForm(!showHospitalForm);
                    setShowEmergencyForm(false);
                }}>
                    Hospital Request
                </button>
            </div>

            {showEmergencyForm && (
                <form onSubmit={handleEmergencySubmit}>
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
                    <button type="submit">Submit Emergency Request</button>
                </form>
            )}

            {showHospitalForm && (
                <form onSubmit={handleHospitalRequestSubmit}>
                    <div>
                        <label>Hospital ID</label>
                        <input 
                            type="text" 
                            name="hospitalID"
                            value={hospitalRequestData.hospitalID} 
                            onChange={handleHospitalRequestChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label>Blood Type</label>
                        <select 
                            name="bloodType"
                            value={hospitalRequestData.bloodType} 
                            onChange={handleHospitalRequestChange} 
                            required
                        >
                            <option value="">Select Blood Type</option>
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
                        <label>Requested By</label>
                        <input 
                            type="text" 
                            name="requestedBy"
                            value={hospitalRequestData.requestedBy} 
                            onChange={handleHospitalRequestChange} 
                            required 
                        />
                    </div>
                    <button type="submit">Submit Hospital Request</button>
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