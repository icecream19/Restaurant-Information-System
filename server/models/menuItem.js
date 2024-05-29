const db = require('../database');

class MenuItem {
    static create(menuItem, callback) {
        const { name, description, price } = menuItem;
        const query = `INSERT INTO menu_items (name, description, price) VALUES (?, ?, ?)`;
        db.run(query, [name, description, price], function (err) {
            callback(err, this.lastID);
        });
    }

    static getAll(callback) {
        const query = `SELECT * FROM menu_items`;
        db.all(query, [], (err, rows) => {
            callback(err, rows);
        });
    }

    static update(item, callback) {
        const { id, name, description, price } = item;
        const query = `UPDATE menu_items SET name = ?, description = ?, price = ? WHERE item_id = ?`;
        db.run(query, [name, description, price, id], function (err) {
            callback(err);
        });
    }

    static delete(id, callback) {
        const query = `DELETE FROM menu_items WHERE item_id = ?`;
        db.run(query, [id], function (err) {
            callback(err);
        });
    }
}

module.exports = MenuItem;
