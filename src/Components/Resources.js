import React from 'react';
import '../Styles/Resources.css';
import evacuation from './videos/evacuation.mp4';
import fire_extinguisher from './videos/fire_extinguisher.mp4';
import homesafety from './videos/home_safety.mp4';
import firesafety from '../Components/videos/firesafety.mp4';

const Resources = () => {
    const videos = [
        { url: evacuation, title: 'Evacuation' },
        { url: fire_extinguisher, title: 'Fire Extinguisher' },
        { url: homesafety, title: 'Home Safety' },
        { url: firesafety, title: 'Fire Safety' }
    ];

    const handleVideoClick = (event) => {
        const videoElement = event.target;

        if (videoElement.requestFullscreen) {
            videoElement.requestFullscreen(); // For modern browsers
        } else if (videoElement.mozRequestFullScreen) {
            videoElement.mozRequestFullScreen(); // For Firefox
        } else if (videoElement.webkitRequestFullscreen) {
            videoElement.webkitRequestFullscreen(); // For Safari
        } else if (videoElement.msRequestFullscreen) {
            videoElement.msRequestFullscreen(); // For IE/Edge
        }

        videoElement.play(); // Play the video automatically
        videoElement.volume = 1.0; // Ensure the sound is at full volume
    };

    return (
        <div className="page-container">
            <h1 className="heading">Safety Resources</h1>
            <div className="content-container">
                <div className="card-container">
                    {videos.map((video, index) => (
                        <div className="styled-card" key={index}>
                            <video
                                className="video"
                                controls
                                onClick={handleVideoClick}
                            >
                                <source src={video.url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <h2>{video.title}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Resources;
