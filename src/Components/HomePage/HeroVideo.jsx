import React from "react";
import "./HeroVideo.css";

const HeroVideo = () => {
  return (
    <div className="hero-wrapper">
      <div className="hero-container">
        <video
          src="/Demo.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="hero-video"
        />
      </div>
    </div>
  );
};

export default HeroVideo;