'use client'; // Ensure this is a client component

import React, { useState } from 'react';
import styled from 'styled-components';
// import Link from 'next/link';

// Styled components for layout
const HomeContainer = styled.div`
    position: relative;
    min-height: 100vh; /* Ensure it covers full height */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
    background-image: url('/red-blood-cells.jpeg'); /* Use the correct path */
    background-size: cover; /* Cover the entire container */
    background-position: center; /* Center the image */
`;

const Header = styled.header`
    position: absolute;
    top: 20px;
    left: 20px; /* Adjusted for better placement */
    display: flex;
    gap: 20px;

    a {
        color: white;
        text-decoration: none;
        font-weight: bold;
        transition: color 0.3s;

        &:hover {
            color: #ffcc00; /* Highlight color on hover */
        }
    }
`;

const Logo = styled.img`
    width: 150px; /* Adjust size as needed */
`;

const GetStartedButton = styled.button`
    padding: 15px 30px;
    font-size: 18px;
    color: #fff;
    background-color: #0070f3; /* Button color */
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #005bb5; /* Darker shade on hover */
    }
`;

const FooterContainer = styled.footer`
    width: 100%;
    padding: 20px 0;
    background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent footer */
    text-align: center;
`;

const SocialLinks = styled.ul`
    list-style-type: none;
    padding: 0;

    .socialLinkItem {
        display: inline-block;
        margin-right: 15px; /* Space between social links */
        color: white;

        &:hover {
            color: #ffcc00; /* Highlight color on hover */
        }
    }
`;

// HomePage Component
function HomePage({ onGetStarted }) {
    return (
        <HomeContainer>
            <Header>
                {/* <Link href="/about">About Us</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/faq">FAQs</Link> */}
            </Header>
            <h1>Welcome to SavePulse</h1>
            <p>Your journey to saving lives starts here.</p>
            <GetStartedButton onClick={onGetStarted}>Get Started</GetStartedButton>
        </HomeContainer>
    );
}

// IndexPage Component
export default function IndexPage() {
   const [showLanding, setShowLanding] = useState(false);

   const handleGetStarted = () => {
       setShowLanding(true);
   };

   return (
       <>
           {showLanding ? (
               <LandingPage /> // Assuming LandingPage is defined elsewhere
           ) : (
               <HomePage onGetStarted={handleGetStarted} />
           )}
           {/* Footer Component */}
           <FooterContainer>
               <p className="copyright">© 2024 SavePulse</p>
               <SocialLinks>
                   <li className="socialLinkItem">Twitter</li>
                   <li className="socialLinkItem">Facebook</li>
                   <li className="socialLinkItem">LinkedIn</li>
                   <li className="socialLinkItem">Instagram</li>
               </SocialLinks>
           </FooterContainer>
       </>
   );
}
