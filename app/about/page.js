import { FaHeartbeat, FaUsers, FaMedkit, FaTrophy, FaExclamationTriangle } from 'react-icons/fa';

export default function About() {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', color: '#333' }}>
            <h1 style={{ textAlign: 'center', color: '#d9534f' }}>About Our Blood Donation Tracker</h1>

            <section style={{ marginBottom: '40px' }}>
                <h2 style={{ textAlign: 'center' }}>Our Mission</h2>
                <p style={{ textAlign: 'center' }}>
                    Our application is dedicated to tracking blood donations from the point of donation to the point of use. 
                    We aim to streamline the donation process, ensuring that every drop counts and reaches those in need efficiently.
                </p>
            </section>

            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                {/* Card 1 */}
                <div style={cardStyle}>
                    <FaHeartbeat size={50} style={iconStyle} />
                    <h3>Health Tracking</h3>
                    <p>Monitor your health metrics related to blood donation.</p>
                </div>

                {/* Card 2 */}
                <div style={cardStyle}>
                    <FaUsers size={50} style={iconStyle} />
                    <h3>Community Support</h3>
                    <p>Join a vibrant community dedicated to saving lives.</p>
                </div>

                {/* Card 3 */}
                <div style={cardStyle}>
                    <FaMedkit size={50} style={iconStyle} />
                    <h3>Emergency Alerts</h3>
                    <p>Get notified when your blood type is urgently needed.</p>
                </div>

                {/* Card 4 */}
                <div style={cardStyle}>
                    <FaTrophy size={50} style={iconStyle} />
                    <h3>Rewards System</h3>
                    <p>Earn badges and rewards for your contributions!</p>
                </div>

                {/* Card 5 */}
                <div style={cardStyle}>
                    <FaExclamationTriangle size={50} style={iconStyle} />
                    <h3>Your Impact</h3>
                    <p>A single donation can save up to three lives!</p>
                </div>
            </div>

        </div>
    );
}

// Styles
const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    margin: '15px',
    flex: '1 1 calc(30% - 30px)', // Responsive width
    textAlign: 'center',
    transition: 'transform 0.2s',
};

const iconStyle = {
    color: '#d9534f',
    marginBottom: '10px',
};

// Add hover effect for cards
const cardHoverEffect = `
    div:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
`;

// Inject hover effect into the document
if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(cardHoverEffect));
    document.head.appendChild(style);
}
