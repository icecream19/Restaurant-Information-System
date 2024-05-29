import React, { useState, useEffect } from 'react';
import MenuDisplay from '../Elements/MenuDisplay';

const Manage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '' });
  const [availableTables, setAvailableTables] = useState(0);
  const [occupiedTables, setOccupiedTables] = useState(0);

  useEffect(() => {
    // Mocking fetchMenuItems and fetchTableData for demonstration
    const fetchMenuItems = async () => {
      // Simulating fetching menu items from an API
      const response = await fetch('/api/menu');
      const data = await response.json();
      setMenuItems(data);
    };

    const fetchTableData = async () => {
      // Simulating fetching table data from an API
      const response = await fetch('/api/tables');
      const data = await response.json();
      setAvailableTables(data.available);
      setOccupiedTables(data.occupied);
    };

    fetchMenuItems();
    fetchTableData();
  }, []);

  const handleAddItem = () => {
    // Add item logic
  };

  const handleDeleteItem = () => {
    // Delete item logic
  };

  const handleEditItem = () => {
    // Edit item logic
  };

  const handleTableChange = () => {
    // Table change logic
  };

  return (
    <div className="manage-page">
      <h1>Manage Menu and Tables</h1>
      <div className="menu-management">
        <MenuDisplay />
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <span>{item.name} - ${item.price}</span>
              <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
              <button onClick={() => handleEditItem(item.id)}>Edit</button>
            </li>
          ))}
        </ul>

        <div className="add-item-box">
            <h2>Add New Item</h2>
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            placeholder="Name"
          />
          <input
            type="text"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            placeholder="Price"
          />
          <button onClick={handleAddItem}>Add Item</button>
        </div>


      <div className="table-management">
        <h2>Table Management</h2>
        <div>
          <label>Available Tables: </label>
          <input
            type="number"
            value={availableTables}
            onChange={(e) => handleTableChange('available', e.target.value)}
          />
        </div>
        <div>
          <label>Occupied Tables: </label>
          <input
            type="number"
            value={occupiedTables}
            onChange={(e) => handleTableChange('occupied', e.target.value)}
          />
        </div>
      </div>
</div>
    </div>
  );
};

export default Manage;
