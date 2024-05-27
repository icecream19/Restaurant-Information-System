const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./restaurant.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS customers (
        customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        contact_info TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS reservations (
        reservation_id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER,
        name TEXT,
        time TEXT,
        date TEXT,
        number_of_people INTEGER,
        table_number INTEGER,
        FOREIGN KEY(customer_id) REFERENCES customers(customer_id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS orders (
        order_id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER,
        reservation_id INTEGER,
        total_price REAL,
        status TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(customer_id) REFERENCES customers(customer_id),
        FOREIGN KEY(reservation_id) REFERENCES reservations(reservation_id)
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

    db.run(`CREATE TABLE IF NOT EXISTS payments (
        payment_id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER,
        amount REAL,
        payment_method TEXT,
        FOREIGN KEY(order_id) REFERENCES orders(order_id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS tables (
        table_number INTEGER PRIMARY KEY,
        capacity INTEGER,
        availability BOOLEAN
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS order_history (
        order_history_id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(order_id) REFERENCES orders(order_id)
    )`);
});

module.exports = db;
