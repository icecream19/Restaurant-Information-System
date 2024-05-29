import React, { useState, useEffect } from 'react';

const MenuDisplay = () => {
  // State to store menu items
  const [menuItems, setMenuItems] = useState([]);

  // Fetch menu items from the menuItems.txt file
  useEffect(() => {
    fetchMenuItems();
  }, []);

  // Function to fetch menu items
  const fetchMenuItems = async () => {
    try {
      // Fetch menu items from the menuItems.txt file
      const response = await fetch('/menuItems.txt');
      const data = await response.json();

      // Update menu items state
      setMenuItems(data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  return (
    <div className="menu-display">
      <h2>Menu Items</h2>
      <ul>
        {/* Map through menu items and render each item */}
        {menuItems.map((menuItem) => (
          <li key={menuItem.id} >
            <span>{menuItem.name}</span> - <span>${menuItem.price.toFixed(2)}</span>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuDisplay;
