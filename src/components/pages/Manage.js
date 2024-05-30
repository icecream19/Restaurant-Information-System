import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuDisplay from '../Elements/MenuDisplay';

const Manage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '' });
  const [editItemId, setEditItemId] = useState(null);
  const [availableTables, setAvailableTables] = useState(0);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/menuItems');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    const fetchTableData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tables');
        setAvailableTables(response.data.available_tables);
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    };

    fetchMenuItems();
    fetchTableData();
  }, []);

  const handleAddOrUpdateItem = async () => {
    try {
      if (editItemId) {
        // Update existing item
        const updatedItem = { ...newItem, item_id: editItemId, price: parseFloat(newItem.price) };
        await axios.put('http://localhost:5000/menuItems/update', updatedItem);
        setMenuItems(menuItems.map(item => (item.item_id === editItemId ? updatedItem : item)));
      } else {
        // Add new item
        const response = await axios.post('http://localhost:5000/menuItems/create', newItem);
        setMenuItems([...menuItems, { ...newItem, item_id: response.data.itemId, price: parseFloat(newItem.price) }]);
      }
      setNewItem({ name: '', description: '', price: '' });
      setEditItemId(null); // Reset edit state
    } catch (error) {
      console.error('Error adding/updating menu item:', error);
    }
  };

  const handleEditItem = (item) => {
    setNewItem({ name: item.name, description: item.description, price: item.price });
    setEditItemId(item.item_id);
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/menuItems/delete/${id}`);
      setMenuItems(menuItems.filter(item => item.item_id !== id));
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  const handleTableChange = async (e) => {
    const updatedTables = parseInt(e.target.value);
    setAvailableTables(updatedTables);
    try {
      await axios.post('http://localhost:5000/tables/update', { availableTables: updatedTables });
    } catch (error) {
      console.error('Error updating table availability:', error);
    }
  };

  return (
    <div className="manage-page">
      <h1>Manage Menu and Tables</h1>
      <div className="menu-management">
        <MenuDisplay />
        <ul>
          {menuItems.map((item) => (
            <li key={item.item_id}>
              <span>{item.name} - ${parseFloat(item.price).toFixed(2)}</span>
              <button onClick={() => handleDeleteItem(item.item_id)}>Delete</button>
              <button onClick={() => handleEditItem(item)}>Edit</button>
            </li>
          ))}
        </ul>

        <div className="add-item-box">
          <h2>{editItemId ? 'Edit Item' : 'Add New Item'}</h2>
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            placeholder="Name"
          />
          <input
            type="text"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            placeholder="Description"
          />
          <input
            type="number"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            placeholder="Price"
          />
          <button onClick={handleAddOrUpdateItem}>{editItemId ? 'Update Item' : 'Add Item'}</button>
        </div>
      </div>

      <div className="table-management">
        <h2>Table Management</h2>
        <div>
          <label>Available Tables: </label>
          <input
            type="number"
            value={availableTables}
            onChange={handleTableChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Manage;

