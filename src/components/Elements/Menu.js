import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Menu = ({ onAddToCart }) => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/menuItems');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching the menu:', error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div className="menu">
      <h2>Menu</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.item_id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {item.name} - ${item.price.toFixed(2)}
            <button onClick={() => onAddToCart(item)}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
