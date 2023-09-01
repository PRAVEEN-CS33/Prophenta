import React from 'react';
import './IconComponent.css'; // Replace with the actual CSS file for styling
import i1 from './doctor.png';
import i2 from './patient.png';
import { Link } from 'react-router-dom';
const IconComponent = () => {
  return (
    <div className="icon-container">
      <div className="icon-box">
        <img
          src={i1} // Replace with the actual path to your doctor image
          alt="Doctor"
          className="icon"
          style={{ width: '200px', height: '190px' }}
        />
        <Link to="/components/login">
        <button className="icon-button">Doctor</button>
        </Link>
      </div>
      <div className="icon-box">
        <img
          src={i2} // Replace with the actual path to your patient image
          alt="Patient"
          className="icon"
          style={{ width: '200px', height: '190px' }} // Adjust the width and height as needed
        />
        <button className="icon-button">Patient</button>
      </div>
    </div>
  );
};

export default IconComponent;