import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-brand">
        <h3>Travel Genie</h3>
        <p>Plan easy. Travel smart.</p>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Travel Genie. All rights reserved.</p>
      </div>

    </footer>
  );
}