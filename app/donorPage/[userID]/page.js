"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function DonorTrackingPage() {
    const [userData, setUserData] = useState(null);
    const [donations, setDonations] = useState([]);
    const [emergencies, setEmergencies] = useState([]); // State for emergency details
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
                setDonations(data.donations || []);
                setEmergencies(data.emergencies || []); // Fetch emergency details
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
            {emergencies.length > 0 && (
                <div className="emergency-info">
                    <h3>Emergency Alerts</h3>
                    {emergencies.map((emergency, index) => (
                        <div key={index} className="emergency-card">
                            <p>Blood Type Needed: {emergency.BloodType}</p>
                            <p>Location: {emergency.RegionLocation}</p>
                            <p>Message: {emergency.Message}</p>
                        </div>
                    ))}
                </div>
            )}

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
                            {donation.DonationDate && <p>Date: {donation.DonationDate}</p>}
                            {donation.BloodType && <p>Blood Type: {donation.BloodType}</p>}
                            {donation.PatientUserID && <p>Patient User ID: {donation.PatientUserID}</p>}
                            {donation.PatientNumber && <p>Patient Number: {donation.PatientNumber}</p>}
                            {donation.Status && <p>Status: {donation.Status}</p>}
                            {donation.FacilityName && <p>Facility Name: {donation.FacilityName}</p>}
                            {donation.Feedback && <p>Feedback: {donation.Feedback}</p>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}