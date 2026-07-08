import React from "react";
import "./HeroVideo.css";
// import Video from "/src/assets/Demo.mp4";
import hero from "/src/assets/hero.png";

const HeroVideo = () => {
  return (
    <div className="hero-wrapper">
      <div className="hero-container">
        {/* <video
          src={Video}
          autoPlay
          muted
          loop
          playsInline
          className="hero-video"
        /> */}
        <img src={hero} alt="hero" className="hero-video" />
      </div>
    </div>
  );
};

export default HeroVideo;