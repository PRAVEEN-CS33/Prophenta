import React from 'react';
import { Link } from 'react-router-dom';
import './PFooter.css';
import logo from './LOGO.png';

function Footer() {
  const sectionStyle = {
    display: 'inline-block',
    verticalAlign: 'top',
    width: '15%', // Adjust the width as needed
    padding: '30px',
    textAlign: 'left',
  };

  const listStyle = {
    listStyleType: 'none', // Remove bullet points from list items
    padding: 0,
  };

  return (
    <footer className="unique-footer">
      <div className="footer-content" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <div style={sectionStyle}>
        
        <img src={logo} alt="Logo" style={{width: '200px'}} />
        </div>
        <div style={sectionStyle}>
          <h3>Home</h3>
          <ul style={listStyle}>
            <li>Home</li>
            <li>Products</li>
            <li>Services</li>
            <li>About</li>
          </ul>
        </div>
        <div style={sectionStyle}>
          <h3>Blog</h3>
          <ul style={listStyle}>
            <li>Blog</li>
            <li>Case Studies</li>
            <li>Testimonials</li>
          </ul>
        </div>
        <div style={sectionStyle}>
          <h3>Resources</h3>
          <ul style={listStyle}>
            <li>FAQs</li>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
          </ul>
        </div>
        <div style={sectionStyle}>
          <h3>Contact</h3>
          <ul style={listStyle}>
            <li>Help</li>
            <li>Contact</li>
            <li>Follow Us</li>
          </ul>
        </div>
        <div style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
          Copyright © 2023 Prophenta. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;