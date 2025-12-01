import React from "react";
import "./Features.css";
import ai from "/src/assets/ai.png"; 
import trip from "/src/assets/trip.png"; 
import save from "/src/assets/save.png"; 

export default function Features() {
  return (
    <div className="features-wrapper">

      <h2 className="features-main-heading">What You Can Do With Travel Genie</h2>
      <p className="features-subtext">
        Your journey feels lighter when the planning feels simple.
        These features keep your ideas organised, help you explore faster
        and save the places you don’t want to forget.
      </p>

      <div className="features-section">

        {/* 1st Feature */}
        <div className="feature-row">
          <div className="feature-text">
            <div className="icon-box violet">
              <img src="/src/assets/calendar.gif" alt="Schedule Icon" />
              {/* <i class="fa-solid fa-hexagon-nodes"></i> */}
            </div>
            <h3>Create Itinerary</h3>
              <p>Easily plan your entire trip in one place, day by day.</p>
              <p>Add destinations, activities, and timings to build your perfect schedule.</p>
              <p>Make changes anytime, move things around without any hassle.</p>
              <p>Your complete travel plan stays organized and ready whenever you are.</p>
          </div>

          <div className="feature-image-wrapper">
            <img src={trip} alt="Feature 1" className="feature-image" />
          </div>
        </div>

        {/* 2nd Feature */}
        <div className="feature-row">
          <div className="feature-image-wrapper order-left">
            <img src={ai} alt="Feature 2" className="feature-image" />
          </div>

          <div className="feature-text order-right">
            <div className="icon-box green">
              <img src="/src/assets/ai.gif" alt="AI Recommendation Icon" /> 
            </div>
            <h3>AI Recommendation</h3>
<p>Get smart suggestions for places to visit in any city you choose.</p>
<p>Easily add recommended spots to your itinerary without any extra effort.</p>
<p>Interact with our AI travel assistant for tips, guidance, and ideas tailored to your trip.</p>
<p>Planning becomes faster, smarter, and more personalized</p>

          </div>
        </div>

        {/* 3rd Feature */}
        <div className="feature-row">
          <div className="feature-text">
            <div className="icon-box orange">
              <img src="/src/assets/bookmark.gif" alt="Saved Places Icon" /> 
            </div>
            <h3>Saved Trips</h3>
<p>Save your complete itinerary once you finish planning.</p>
<p>Visit your dedicated Saved Trips page anytime to review it again.</p>
<p>No need to rebuild your plan from scratch when you're ready to travel.</p>
<p>Your trips stay organised and easy to access in one place.</p>
            </div>

          <div className="feature-image-wrapper">
            <img src={save} alt="Feature 3" className="feature-image" />
          </div>
        </div>

      </div>
    </div>
  );
}