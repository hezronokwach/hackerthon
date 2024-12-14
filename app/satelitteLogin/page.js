"use client";
import { useState } from 'react';
import styles from './Login.module.css'; // Importing the CSS Module

export default function Login() {
    const [satelitteID, setSatelitteID] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        try {
            const response = await fetch('http://localhost:3000/satelitteLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({satelitteID, email, password}),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: "success", text: data.message });
                setTimeout(() => {
                    window.location.href = '/satelitteDashboard/add'; // Redirect using window.location
                }, 1000);
            } else {
                setMessage({ type: "error", text: data.message });
            }
        } catch (error) {
            setMessage({ type: "error", text: "An error occurred. Please try again." });
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2>Satellite Login</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="satelitteID">Satellite ID</label>
                    <input 
                        id="satelitteID"
                        type="text" 
                        value={satelitteID} 
                        onChange={e => setSatelitteID(e.target.value)} 
                        placeholder="Enter Satellite ID"
                        required 
                        className={styles.input} 
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input 
                        id="email"
                        type="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        placeholder="Enter your email"
                        required 
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input 
                        id="password"
                        type="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        placeholder="Enter your password"
                        required 
                        className={styles.input}
                    />
                </div>
                <button type="submit" className={styles.submitButton}>Submit</button>
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
        </div>
    );
}
