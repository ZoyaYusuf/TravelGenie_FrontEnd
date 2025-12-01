import React from "react";
import "./HeroVideo.css";
import Video from "/src/assets/Demo.mp4"

const HeroVideo = () => {
  return (
    <div className="hero-wrapper">
      <div className="hero-container">
        <video
          src={Video}
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