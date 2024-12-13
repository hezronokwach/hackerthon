import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const HomeContainer = styled.div`
    position: relative;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
    background-image: url('/path/to/your/healthcare-background.jpg'); /* Replace with your animated background */
    background-size: cover;
    background-position: center;
`;

const Header = styled.header`
    position: absolute;
    top: 20px;
    right: 20px;
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
    margin-bottom: 40px; /* Space between logo and content */
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

const Home = () => {
    return (
        <HomeContainer>
            <Header>
                <Link href="/about">About Us</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/faq">FAQ</Link>
            </Header>
            <Logo src="/path/to/savepulse-logo.png" alt="SavePulse Logo" /> {/* Replace with your logo path */}
            <h1>Welcome to SavePulse</h1>
            <p>Your journey to saving lives starts here.</p>
            {/* Get Started Button that redirects to Landing Page */}
            <Link href="/app">
                <GetStartedButton>Get Started</GetStartedButton>
            </Link>
        </HomeContainer>
    );
};

export default Home;
