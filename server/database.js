const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./restaurant.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS orders (
        order_id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_type TEXT,
        total_price REAL,
        status TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS menu_items (
        item_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS order_items (
        order_item_id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER,
        item_id INTEGER,
        quantity INTEGER,
        FOREIGN KEY(order_id) REFERENCES orders(order_id),
        FOREIGN KEY(item_id) REFERENCES menu_items(item_id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS tables (
        id INTEGER PRIMARY KEY,
        available_tables INTEGER
    )`);

    // Initialize available tables
    db.run(`INSERT OR IGNORE INTO tables (id, available_tables) VALUES (1, 8)`);

    // Clear existing data
    db.run(`DELETE FROM menu_items`);
    db.run(`DELETE FROM orders`);
    db.run(`DELETE FROM order_items`);

    // Insert placeholder data for menu items
    db.run(`INSERT INTO menu_items (name, description, price) VALUES ('Pizza', 'Delicious cheese pizza', 12.00)`);
    db.run(`INSERT INTO menu_items (name, description, price) VALUES ('Pasta', 'Creamy alfredo pasta', 10.00)`);
    db.run(`INSERT INTO menu_items (name, description, price) VALUES ('Salad', 'Fresh garden salad', 8.00)`);
    db.run(`INSERT INTO menu_items (name, description, price) VALUES ('Burger', 'Juicy beef burger', 15.00)`);
    db.run(`INSERT INTO menu_items (name, description, price) VALUES ('Ice Cream', 'Vanilla ice cream', 5.00)`);
});

module.exports = db;
