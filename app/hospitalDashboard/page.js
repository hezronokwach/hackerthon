"use client";
import { useState } from 'react';
import styles from './EmergencyBloodRequest.module.css';

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
        <div className={styles.container}>
            <div className={styles.form}>
                <h2>Emergency Blood Request</h2>
                <button 
                    onClick={() => setShowForm(!showForm)} 
                    className={styles.redButton}
                >
                    {showForm ? "Hide Form" : "Call for Emergency"}
                </button>
                {showForm && (
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label>Blood Type</label>
                            <select
                                className={styles.select}
                                value={bloodType}
                                onChange={(e) => setBloodType(e.target.value)}
                                required
                            >
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
                        <div className={styles.formGroup}>
                            <label>Hospital ID</label>
                            <input
                                className={styles.input}
                                type="text"
                                value={hospitalID}
                                onChange={(e) => setHospitalID(e.target.value)}
                                required
                                placeholder="Enter Hospital ID"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Regional ID</label>
                            <input
                                className={styles.input}
                                type="text"
                                value={regionalID}
                                onChange={(e) => setRegionalID(e.target.value)}
                                required
                                placeholder="Enter Regional ID"
                            />
                        </div>
                        <button type="submit" className={styles.submitButton}>
                            Submit
                        </button>
                    </form>
                )}
                {message && (
                    <div className={`${styles.message} ${message.type === 'success' ? styles.successMessage : styles.errorMessage}`}>
                        {message.text}
                    </div>
                )}
            </div>
        </div>
    );
}
