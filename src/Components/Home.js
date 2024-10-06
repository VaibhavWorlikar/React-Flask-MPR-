import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import '../Styles/Home.css'; // Import your CSS file
import bgVideo from '../Components/videos/bgvideo.mp4'; 
const Home = () => {
    const [location, setLocation] = useState({ lat: null, lng: null });
    const [showChatbot, setShowChatbot] = useState(false);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            (error) => console.error(error)
        );
    }, []);

    const handleEmergencyClick = () => {
        if (location.lat && location.lng) {
            alert(`Emergency! Location detected: Latitude ${location.lat}, Longitude ${location.lng} \n HELP WILL BE SENT SHORTLY`);
        } else {
            alert('Location not detected. Please try again.');
        }
    };

    return (
        
        <div id='home' className="home-container">

<video className="video-bg" autoPlay loop muted>
                <source src={bgVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            {/* Information Section */}
            <div className="info-container">
                <h1>Agni Rakshak</h1>
                <h2>Your trusted partner in fire safety.</h2>
                <Button onClick={handleEmergencyClick} className="emergency-button">
                    Emergency
                </Button>
            </div>
        </div>
    );
};

export default Home;
