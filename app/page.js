import React from 'react'
import Link from "next/link"
import './globals.css'

export default function LandingPage() {
  return (
    <div>
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-red-600">SavePulse</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Navigation placeholder */}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-white shadow-md mb-8">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Save Lives, One Drop at a Time</h2>
          <p className="mt-2 text-gray-600">Track your blood donation journey and see your impact</p>
        </div>
      </header>

      {/* Special Links Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/signup" className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300 text-center">
            <div className="mx-auto mb-2 text-red-600 text-4xl">🩸</div>
            <span className="font-semibold text-gray-800">Donor Sign Up</span>
          </Link>
          
          <Link href="/login" className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300 text-center">
            <div className="mx-auto mb-2 text-red-600 text-4xl">🩺</div>
            <span className="font-semibold text-gray-800">Donor Login</span>
          </Link>
          
          <Link href="/satelitteLogin" className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300 text-center">
            <div className="mx-auto mb-2 text-red-600 text-4xl">🏥</div>
            <span className="font-semibold text-gray-800">Satellite Login</span>
          </Link>
          
          <Link href="/satelitteSignUp" className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300 text-center">
            <div className="mx-auto mb-2 text-red-600 text-4xl">➕</div>
            <span className="font-semibold text-gray-800">Satellite Sign Up</span>
          </Link>
        </div>
      </div>

      {/* Card Grid */}
      <div className="card-grid">
        {/* Donation Center Card */}
        <div className="card">
          <img src="/api/placeholder/350/250" alt="Donation Center" className="card-image" />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Find Donation Centers</h3>
            <p className="text-gray-600 mb-4">Locate nearby blood donation centers easily</p>
            <button className="btn-primary w-full py-2 rounded-md">Find Centers</button>
          </div>
        </div>

        {/* Donation Tracking Card */}
        <div className="card">
          <img src="/api/placeholder/350/250" alt="Donation Tracking" className="card-image" />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Track Your Donation</h3>
            <p className="text-gray-600 mb-4">Follow your blood's journey from donation to recipient</p>
            <button className="btn-primary w-full py-2 rounded-md">View Tracking</button>
          </div>
        </div>

        {/* Emergency Needs Card */}
        <div className="card">
          <img src="app/images/img1.jpeg" alt="Emergency Needs" className="card-image" />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Emergency Blood Needs</h3>
            <p className="text-gray-600 mb-4">Urgent calls for blood donation in your area</p>
            <button className="btn-primary w-full py-2 rounded-md">View Alerts</button>
          </div>
        </div>

        

        {/* Donor Rewards Card */}
        <div className="card">
          <img src="/api/placeholder/350/250" alt="Donor Rewards" className="card-image" />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Donor Rewards</h3>
            <p className="text-gray-600 mb-4">Earn badges and recognition for your donations</p>
            <button className="btn-primary w-full py-2 rounded-md">View Rewards</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="bg-white shadow-md mt-8">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">&copy; 2024 LifeShare. Saving Lives Together.</p>
        </div>
      </footer> */}
    </div>
  )
}