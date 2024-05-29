const db = require('../database');

class Order {
    static create(order, callback) {
        const { orderType, totalPrice, status } = order;
        const query = `INSERT INTO orders (order_type, total_price, status) VALUES (?, ?, ?)`;
        db.run(query, [orderType, totalPrice, status], function (err) {
            callback(err, this.lastID);
        });
    }

    static addItem(orderId, itemId, quantity, callback) {
        const query = `INSERT INTO order_items (order_id, item_id, quantity) VALUES (?, ?, ?)`;
        db.run(query, [orderId, itemId, quantity], function (err) {
            callback(err);
        });
    }

    static processPayment(orderId, callback) {
        const paymentQuery = `UPDATE orders SET status = 'Paid' WHERE order_id = ?`;
        db.run(paymentQuery, [orderId], function (err) {
            callback(err);
        });
    }

    static complete(orderId, callback) {
        const completeQuery = `UPDATE orders SET status = 'Completed' WHERE order_id = ?`;
        db.run(completeQuery, [orderId], function (err) {
            callback(err);
        });
    }

    static getAll(callback) {
        const query = `SELECT * FROM orders`;
        db.all(query, [], (err, rows) => {
            callback(err, rows);
        });
    }
}

module.exports = Order;
