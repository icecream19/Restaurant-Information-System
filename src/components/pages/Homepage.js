import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Homepage = () => {
  const [availableTables, setAvailableTables] = useState(0);
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tables');
        setAvailableTables(response.data.available_tables);
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    };

    fetchTableData();
  }, []);

  const handleTakeaway = () => {
    navigate('/order');
  };

  const handleDineIn = () => {
    if (availableTables > 0) {
      navigate('/order', { state: { dineIn: true } });
    } else {
      setNotification('Maximum occupancy reached for dine-ins. Please visit the manage page to update table availability.');
    }
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
      {notification && <p className="notification">{notification}</p>}
    </div>
  );
};

export default Homepage;
