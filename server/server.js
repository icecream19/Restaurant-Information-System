// server.js

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

let menuItems = []; // This would typically be loaded from a database or a file
let tableData = { available: 10, occupied: 0 }; // Example initial data

// Load menu items from a file
const loadMenuItems = () => {
  const data = fs.readFileSync(path.join(__dirname, 'menuItems.txt'), 'utf8');
  menuItems = JSON.parse(data);
};

// Save menu items to a file
const saveMenuItems = () => {
  fs.writeFileSync(path.join(__dirname, 'menuItems.txt'), JSON.stringify(menuItems));
};

// API endpoints

// Get menu items
app.get('/api/menu', (req, res) => {
  loadMenuItems();
  res.json(menuItems);
});

// Add a new menu item
app.post('/api/menu', (req, res) => {
  const newItem = req.body;
  newItem.id = menuItems.length ? menuItems[menuItems.length - 1].id + 1 : 1;
  menuItems.push(newItem);
  saveMenuItems();
  res.status(201).json(newItem);
});

// Delete a menu item
app.delete('/api/menu/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  menuItems = menuItems.filter(item => item.id !== id);
  saveMenuItems();
  res.status(204).send();
});

// Edit a menu item
app.put('/api/menu/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedItem = req.body;
  menuItems = menuItems.map(item => (item.id === id ? updatedItem : item));
  saveMenuItems();
  res.json(updatedItem);
});

// Get table data
app.get('/api/tables', (req, res) => {
  res.json(tableData);
});

// Update table data
app.put('/api/tables/:type', (req, res) => {
  const { type } = req.params;
  const { value } = req.body;
  tableData[type] = parseInt(value, 10);
  res.json(tableData);
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
