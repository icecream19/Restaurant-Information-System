const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');

const app = express();

app.use(cors()); // Add this line to enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import Routes
const ordersRoute = require('./routes/orders');
const menuItemsRoute = require('./routes/menuItems');
const tablesRoute = require('./routes/tables');

// Use Routes
app.use('/orders', ordersRoute);
app.use('/menuItems', menuItemsRoute);
app.use('/tables', tablesRoute);

// Start the Server
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
