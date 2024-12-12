"use client";
import Navbar from "@/Components/Navbar/page"
import Link from "next/link"
import { useEffect, useState } from 'react'

function LandingPage() {
  const [donationInfo, setDonationInfo] = useState(null);

  useEffect(() => {
    // Check for donation info in localStorage when component mounts
    const info = localStorage.getItem('donationInfo');
    if (info) {
      setDonationInfo(JSON.parse(info));
      // Clear the info after displaying
      localStorage.removeItem('donationInfo');
    }
  }, []);

  return (
    <div>
      <h1>Landing page</h1>
      {donationInfo && (
        <div className="donation-message">
          <h2>Blood Donation Successful!</h2>
          <p>Time: {donationInfo.donationDate}</p>
          <p>Satellite ID: {donationInfo.satelliteId}</p>
          <p>Status: {donationInfo.status}</p>
        </div>
      )}
      <Link href="/signup" className="nav-link">Sign Up</Link>
      <Link href="/login" className="nav-link">Log In</Link>
      <Link href="/satelitteLogin" className="nav-link">Satelitte Log In</Link>
      <Link href="/satelitteDashboard/add" className="nav-link">Donor Details</Link>
      <Link href="/satelitteSignUp" className="nav-link">Satelitte</Link>
    </div>
  )
}

export default LandingPage