'use client';
import React, { useState } from 'react';
import Link from "next/link";
import './globals.css'; // Ensure you have global styles here

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const donationCenters = [
    { name: "Regional Blood Transfusion Center - Kisumu", address: "Along Kakamega Road, next to Jaramogi Oginga Odinga Teaching and Referral Hospital", phone: "+254726688750" },
    { name: "Kisumu County Referral Hospital", address: "Kisumu Central, Kisumu City", phone: "+254722399034" },
    { name: "Kisumu Blood Donation Drive", address: "Various locations during drives", phone: "Check local listings" },
  ];

  const renderCard = (imageSrc, title, description, buttonText) => (
    <div className="card bg-white shadow-md rounded-lg overflow-hidden">
      <img src={imageSrc} alt={title} className="card-image w-full h-auto" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <button 
          className="btn-primary w-full py-2 rounded-md"
          onClick={() => setIsModalOpen(true)} // Open modal on button click
        >
          {buttonText}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Blood Donation Tracker</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="mt-16 flex-grow"> {/* Added margin-top to push content down */}
        {/* Special Links Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Save Lives, One Drop at a Time</h2>
            <p className="mt-4 text-xl text-gray-600">Track your blood donation journey and see your impact</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/signup" className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300 text-center">
              <div className="mx-auto mb-2 text-red-600 text-4xl">🩸</div>
              <span className="font-semibold text-gray-800">Donor Sign Up</span>
            </Link>

            <Link href="/login" className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300 text-center">
              <div className="mx-auto mb-2 text-red-600 text-4xl">🩺</div>
              <span className="font-semibold text-gray-800">Donor Login</span>
            </Link>
          </div>
        </div>

        {/* Card Grid */}
        <div className="card-grid max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Donation Center Card */}
          {renderCard("/images/img1.jpeg", "Find Donation Centers", "Locate nearby blood donation centers easily", "Find Centers")}
          {/* Donation Tracking Card */}
          {renderCard("/images/img2.jpeg", "Track Your Donation", "Follow your blood's journey from recipient", "View Tracking")}
          {/* Emergency Needs Card */}
          {renderCard("/images/img3.jpeg", "Emergency Blood Needs", "Urgent calls for blood donation in your area", "View Alerts")}
          {/* Donor Rewards Card */}
          {renderCard("/images/img4.jpeg", "Donor Rewards", "Earn badges and recognition for your donations", "View Rewards")}
        </div>
      </main>

      {/* Fixed Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-md z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
          <p>&copy; {new Date().getFullYear()} Blood Donation Tracker. All rights reserved.</p>
        </div>
      </footer>

      {/* Modal for Donation Centers */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
            <h2 className="text-xl font-bold mb-4">Available Donation Centers in Kisumu</h2>
            <ul className="list-disc list-inside mb-4">
              {donationCenters.map((center, index) => (
                <li key={index}>
                  <strong>{center.name}</strong><br />
                  {center.address}<br />
                  Phone: {center.phone}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="btn-primary mt-4 w-full py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
