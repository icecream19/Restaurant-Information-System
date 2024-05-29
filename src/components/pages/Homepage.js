// src/components/pages/Homepage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

  const handleTakeaway = () => {
    navigate('/order');
  };

  const handleDineIn = () => {
    navigate('/order', { state: { dineIn: true } });
  };

  return (
    <div className="homepage">
      <h1>Welcome to Our Restaurant</h1>
      <div className="options">
        <button className="option-button takeaway" onClick={handleTakeaway}>
          Takeaway
        </button>
        <button className="option-button dinein" onClick={handleDineIn}>
          Dine In
        </button>
      </div>
    </div>
  );
};

export default Homepage;



