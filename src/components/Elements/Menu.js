import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Menu = ({ onAddToCart }) => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('/menu.txt');
        const data = response.data.split('\n').map(line => {
          const [id, name, price] = line.split(', ');
          return { id, name, price };
        });
        setMenuItems(data);
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
        {menuItems.map((item, index) => (
          // Check if item name and price are not empty before rendering
          item.name && item.price && (
            <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {item.name} - ${item.price}
              <button onClick={() => onAddToCart(item)}>Add</button>
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default Menu;


