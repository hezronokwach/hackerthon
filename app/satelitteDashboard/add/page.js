"use client";
import { useState } from 'react';
import styles from './SatelitteDashboard.module.css';

export default function DonorForm() {
    const [userID, setUserID] = useState('');
    const [donationDate, setDonationDate] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [status, setStatus] = useState('');
    const [satelliteId, setSatelliteId] = useState('');
    const [responseMessage, setResponseMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:3000/satelitteDashboard/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userID,
                    donationDate,
                    bloodType,
                    status,
                    satelliteId
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setResponseMessage({ 
                    type: "success", 
                    text: "Donation recorded successfully!" 
                });
                
                setTimeout(() => {
                    window.location.href = `/donorPage/${userID}`;
                }, 1500);
            } else {
                // Handle server-side errors
                setResponseMessage({ 
                    type: "error", 
                    text: data.message || "An error occurred. Please try again." 
                });
            }
        } catch (error) {
            console.error('Error:', error);
            setResponseMessage({ 
                type: "error", 
                text: "Network error. Please check your connection." 
            });
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.dashboardGrid}>
                <h1 className={styles.dashboardTitle}>Donate Blood</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>User ID:</label>
                        <input 
                            type="text" 
                            className={styles.input}
                            value={userID} 
                            onChange={(e) => setUserID(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Donation Date:</label>
                        <input 
                            type="date" 
                            className={styles.input}
                            value={donationDate} 
                            onChange={(e) => setDonationDate(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Blood Type:</label>
                        <select 
                            className={styles.input}
                            value={bloodType} 
                            onChange={(e) => setBloodType(e.target.value)} 
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
                    <div className={styles.formGroup}>
                        <label>Status:</label>
                        <select 
                            className={styles.input}
                            value={status} 
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">Select Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Satellite ID:</label>
                        <input 
                            type="text" 
                            className={styles.input}
                            value={satelliteId} 
                            onChange={(e) => setSatelliteId(e.target.value)} 
                            required 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className={styles.submitButton}
                    >
                        Submit Donation
                    </button>
                </form>

                {responseMessage && (
                    <div 
                        className={`
                            ${styles.message} 
                            ${responseMessage.type === 'success' ? styles.successMessage : styles.errorMessage}
                        `}
                    >
                        {responseMessage.text}
                    </div>
                )}
            </div>
        </div>
    );
}