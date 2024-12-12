"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DonorTrackingPage() {
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        const storedDonations = JSON.parse(localStorage.getItem('allDonations') || '[]');
        setDonations(storedDonations);
    }, []);

    return (
        <div className="tracking-container">
            <h1>My Donation History</h1>
            
            {donations.length === 0 ? (
                <div className="no-donations">
                    <p>No donations found.</p>
                    <Link href="/satelitteDashboard/add">Make a Donation</Link>
                </div>
            ) : (
                <div className="donations-list">
                    {donations.map((donation, index) => (
                        <div key={index} className="donation-card">
                            <div className="donation-header">
                                <h3>Donation #{index + 1}</h3>
                                <span className={`status ${donation.status.toLowerCase()}`}>
                                    {donation.status}
                                </span>
                            </div>
                            <div className="donation-info">
                                <p><strong>Date:</strong> {donation.donationDate}</p>
                                <p><strong>Satellite:</strong> {donation.satelliteId}</p>
                                <p><strong>Blood Type:</strong> {donation.bloodType}</p>
                                <p><strong>User ID:</strong> {donation.userID}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}