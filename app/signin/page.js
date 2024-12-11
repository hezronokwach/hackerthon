"use client";
import Router from 'next/router';

import { useState } from 'react'
export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:3000/signin', {
                method: 'POST',
                headers: {
                    'Content-type': "application/json",

                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json()
            console.log(data)

            // Inside your handleSubmit function
            if (response.ok) {
                //setMessage({ type: "success", text: data.message });
                Router.push('/'); // Redirect to the about page
            } else {
                setMessage({ type: "error", text: data.message })
            }
        } catch (error) {
            setMessage({ type: "error", text: "Something went wrong. Please try again." });

        }

    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
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
    )
}