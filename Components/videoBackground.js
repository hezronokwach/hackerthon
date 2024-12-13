// components/VideoBackground.js

import React from 'react';
import styled from 'styled-components';

const videoContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1; /* Ensure video is behind other content */
`;

const video = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover; /* Cover the entire container */
    opacity: 0.5; /* Optional: Adjust opacity for better content visibility */
`;

const videoBackground = () => {
    return (
        <videoContainer>
            <video autoPlay loop muted playsInline>
                <source src="/videos/background-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </videoContainer>
    );
};

export default videoBackground;
