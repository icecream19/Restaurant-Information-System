const db = require('../database');

class Table {
    static getAvailability(callback) {
        const query = `SELECT available_tables FROM tables WHERE id = 1`;
        db.get(query, [], (err, row) => {
            callback(err, row);
        });
    }

    static async getAvailabilityAsync() {
        return new Promise((resolve, reject) => {
            const query = `SELECT available_tables FROM tables WHERE id = 1`;
            db.get(query, [], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    }

    static updateAvailability(availableTables, callback) {
        const query = `UPDATE tables SET available_tables = ? WHERE id = 1`;
        db.run(query, [availableTables], function (err) {
            callback(err);
        });
    }

    static async updateAvailabilityAsync(availableTables) {
        return new Promise((resolve, reject) => {
            const query = `UPDATE tables SET available_tables = ? WHERE id = 1`;
            db.run(query, [availableTables], function (err) {
                if (err) reject(err);
                resolve();
            });
        });
    }
}

module.exports = Table;
