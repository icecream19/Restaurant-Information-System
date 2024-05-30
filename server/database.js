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

    // Insert placeholder data for menu items if not already present
    db.get('SELECT COUNT(*) AS count FROM menu_items', (err, row) => {
        if (err) {
            console.error('Error counting menu items:', err);
            return;
        }
        if (row.count === 0) {
            const menuItems = [
                { name: 'Pizza', description: 'Delicious cheese pizza', price: 12.00 },
                { name: 'Pasta', description: 'Creamy alfredo pasta', price: 10.00 },
                { name: 'Salad', description: 'Fresh garden salad', price: 8.00 },
                { name: 'Burger', description: 'Juicy beef burger', price: 15.00 },
                { name: 'Ice Cream', description: 'Vanilla ice cream', price: 5.00 }
            ];
            const stmt = db.prepare('INSERT INTO menu_items (name, description, price) VALUES (?, ?, ?)');
            for (const item of menuItems) {
                stmt.run(item.name, item.description, item.price);
            }
            stmt.finalize();
        }
    });
});

module.exports = db;
