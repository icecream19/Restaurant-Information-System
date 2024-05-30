import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MenuDisplay = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('/menuItems');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div className="menu-display">
      <h2>Menu Items</h2>
      <ul>
        {menuItems.map((menuItem) => (
          <li key={menuItem.item_id}>
            <span>{menuItem.name}</span> - <span>${menuItem.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuDisplay;
