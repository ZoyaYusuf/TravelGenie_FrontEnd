import React from 'react';
import HeroVideo from './HeroVideo';
import Features from './Features';
import Timeline from './CustomizedTimeline'
import Footer from './Footer';
import './HomePage.css'; // make sure CTA CSS is included here

const HomePage = () => {
  return (
    <div style={{ width: "100vw", overflowX: "hidden" }}>
      
      {/* Hero Video */}
      <HeroVideo />

      {/* Features Section */}
      <Features />

      <Timeline/>

      {/* CTA Section */}
      <div className="cta-section">
        <h2 className="cta-heading">Plan Your Next Adventure Effortlessly</h2>
        <p className="cta-subtext">
          Explore recommended places, save your trips, and get AI guidance to make every journey seamless.
        </p>
        <button className="cta-button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Create Your Itinerary
        </button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;