import React from 'react';
import './PNavbar.css';
import img1 from './user.png';
import logo from './LOGO.png';
import { Link } from 'react-router-dom';

const PNavbar = () => {
  return (
    <div className='nav'>
    <nav className="unique-navbar">
    <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="#about">About</a>
        <a href="#skin">Services</a>
        <a href="#contact">Contact</a>
        <a href='/components/bothome'>MediBot</a>
        <a href="/components/land">Diagnosis</a>
      </div>
      <div className="avatar">
      <Link to='components/login'>
        <img src={img1} alt="User Avatar" />
        </Link>
      </div>
    </nav>
    </div>
  );
};

export default PNavbar;