"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function DonorTrackingPage() {
    const [userData, setUserData] = useState(null);
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userID = params.userID;
                const response = await fetch(`http://localhost:3000/donorPage/${userID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                setUserData(data.user);
                setDonations(data.donations);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.userID]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="donor-page">
            {userData && (
                <div className="user-info">
                    <h2>Welcome, {userData.firstName} {userData.lastName}</h2>
                    <p>Email: {userData.email}</p>
                </div>
            )}

            <h3>Your Donations</h3>
            {donations.length === 0 ? (
                <p>No donations found</p>
            ) : (
                <div className="donations-list">
                    {donations.map((donation, index) => (
                        <div key={index} className="donation-card">
                            <h4>Donation Details</h4>
                            <p>Date: {donation.DonationDate}</p>
                            <p>Blood Type: {donation.BloodType}</p>
                            <p>Status: {donation.Status}</p>
                            <p>Satellite ID: {donation.SatelliteID}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}