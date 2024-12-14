"use client";
import { useState } from 'react';
import styles from './Login.module.css'; // Import the CSS module

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
                body: JSON.stringify({ satelitteID, email, password }),
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
            <div className={styles.signUpGrid}>
                <h2 className={styles.signUpTitle}>Satellite Login</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="satelitteID">Satellite ID</label>
                        <input
                            type="text"
                            id="satelitteID"
                            className={styles.input}
                            placeholder="Enter your Satellite ID"
                            value={satelitteID}
                            onChange={(e) => setSatelitteID(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className={styles.input}
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className={styles.input}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        Submit
                    </button>
                </form>
                {message && (
                    <div
                        className={`${styles.message} ${
                            message.type === "success" ? styles.successMessage : styles.errorMessage
                        }`}
                    >
                        {message.text}
                    </div>
                )}
            </div>
        </div>
    );
}
