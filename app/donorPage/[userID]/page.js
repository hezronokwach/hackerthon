"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import styles from './DonorTrackingPage.module.css';

const DONATION_STAGES = [
    'in store at satelitte',
    'screaning',
    'processing',
    'ready for patient',
    'delivered'
];

export default function DonorTrackingPage() {
    const [userData, setUserData] = useState(null);
    const [donations, setDonations] = useState([]);
    const [emergencies, setEmergencies] = useState([]);
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
                setEmergencies(data.emergencies || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.userID]);

    const getDonationCardClass = (donation, index) => {
        const stageIndex = DONATION_STAGES.indexOf(donation.Status);
        
        if (index === donations.length - 1) return `${styles.donationCard} ${styles.active}`;
        if (stageIndex !== -1) return `${styles.donationCard} ${styles.completed}`;
        return styles.donationCard;
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={styles.donorPage}>
            {userData && (
                <div className={styles.userInfo}>
                    <h2>Welcome, {userData.firstName} {userData.lastName}</h2>
                    <p>{userData.email}</p>
                </div>
            )}

            <div className={styles.donationProgressContainer}>
                <div className={styles.donationProgressLine}></div>
                <div className={styles.donationsList}>
                    {donations.map((donation, index) => (
                        <div key={index} className={getDonationCardClass(donation, index)}>
                            <div className={styles.donationStageIndicator}>{index + 1}</div>
                            <h4>Donation Details</h4>
                            <p>
                                <span>Date:</span>
                                <span>{donation.DonationDate}</span>
                            </p>
                            <p>
                                <span>Blood Type:</span>
                                <span>{donation.BloodType}</span>
                            </p>
                            <p>
                                <span>Status:</span>
                                <span>{donation.Status}</span>
                            </p>
                            <p>
                                <span>Facility:</span>
                                <span>{donation.FacilityName}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}