"use client";
import { useState } from 'react';
import styles from './SatelitteSignUp.module.css';

export default function SatelitteSignUp() {
    const [satelliteID, setSatelliteID] = useState('');
    const [satelliteName, setSatelliteName] = useState('');
    const [satelliteLocation, setSatelliteLocation] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPassword, setContactPassword] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:3000/satellite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    satelliteID, 
                    satelliteName, 
                    satelliteLocation, 
                    contactPerson, 
                    contactEmail, 
                    contactPassword
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: "success", text: data.message });
                setTimeout(() => {
                    window.location.href = '/login';
                }, 1500);
            } else {
                setMessage({ type: "error", text: data.message });
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage({ type: "error", text: "An error occurred. Please try again." });
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.signUpGrid}>
                <h1 className={styles.signUpTitle}>Satellite Sign Up</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Satellite ID</label>
                        <input 
                            type="text" 
                            className={styles.input}
                            placeholder="Enter satellite ID"
                            value={satelliteID} 
                            onChange={(e) => setSatelliteID(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Satellite Name</label>
                        <input 
                            type="text" 
                            className={styles.input}
                            placeholder="Enter satellite name"
                            value={satelliteName} 
                            onChange={(e) => setSatelliteName(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Satellite Location</label>
                        <input 
                            type="text" 
                            className={styles.input}
                            placeholder="Enter satellite location"
                            value={satelliteLocation} 
                            onChange={(e) => setSatelliteLocation(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Contact Person</label>
                        <input 
                            type="text" 
                            className={styles.input}
                            placeholder="Enter contact person name"
                            value={contactPerson} 
                            onChange={(e) => setContactPerson(e.target.value)} 
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Contact Email</label>
                        <input 
                            type="email" 
                            className={styles.input}
                            placeholder="Enter contact email"
                            value={contactEmail} 
                            onChange={(e) => setContactEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Contact Password</label>
                        <input 
                            type="password" 
                            className={styles.input}
                            placeholder="Create a secure password"
                            value={contactPassword} 
                            onChange={(e) => setContactPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className={styles.submitButton}
                    >
                        Submit
                    </button>
                </form>

                {message && (
                    <div 
                        className={`
                            ${styles.message} 
                            ${message.type === 'success' ? styles.successMessage : styles.errorMessage}
                        `}
                    >
                        {message.text}
                    </div>
                )}
            </div>
        </div>
    );
}
