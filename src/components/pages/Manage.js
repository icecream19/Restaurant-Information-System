import React, { useState, useEffect } from 'react';

const Manage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '' });
  const [availableTables, setAvailableTables] = useState(0);
  const [occupiedTables, setOccupiedTables] = useState(0);

  useEffect(() => {
    // Fetch menu items and table data from the server when the component mounts
    fetchMenuItems();
    fetchTableData();
  }, []);

  const fetchMenuItems = async () => {
    const response = await fetch('/api/menu');
    const data = await response.json();
    setMenuItems(data);
  };

  const fetchTableData = async () => {
    const response = await fetch('/api/tables');
    const data = await response.json();
    setAvailableTables(data.available);
    setOccupiedTables(data.occupied);
  };

  const handleAddItem = async () => {
    await fetch('/api/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });
    fetchMenuItems();
    setNewItem({ name: '', price: '' });
  };

  const handleDeleteItem = async (id) => {
    await fetch(`/api/menu/${id}`, { method: 'DELETE' });
    fetchMenuItems();
  };

  const handleEditItem = async (id, updatedItem) => {
    await fetch(`/api/menu/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedItem),
    });
    fetchMenuItems();
  };

  const handleTableChange = async (type, value) => {
    await fetch(`/api/tables/${type}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value }),
    });
    fetchTableData();
  };

  return (
    <div className="manage-page">
      <h1>Manage Menu and Tables</h1>
      <div className="menu-management">
        <h2>Menu Items</h2>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price}
              <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
              <button onClick={() => handleEditItem(item.id, { ...item, name: 'New Name', price: 'New Price' })}>Edit</button>
            </li>
          ))}
        </ul>
        <h3>Add New Item</h3>
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
  );
};

export default Manage;
