const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Table = require('../models/table');

router.post('/create', (req, res) => {
    const { orderType, totalPrice, status } = req.body;
    if (orderType === 'dine-in') {
        Table.getAvailability((err, row) => {
            if (err) return res.status(500).send(err);
            if (row.available_tables <= 0) {
                return res.status(400).send({ message: 'No tables available' });
            } else {
                Order.create({ orderType, totalPrice, status }, (err, orderId) => {
                    if (err) return res.status(500).send(err);
                    Table.updateAvailability(row.available_tables - 1, (err) => {
                        if (err) return res.status(500).send(err);
                        res.status(200).send({ orderId });
                    });
                });
            }
        });
    } else {
        Order.create({ orderType, totalPrice, status }, (err, orderId) => {
            if (err) return res.status(500).send(err);
            res.status(200).send({ orderId });
        });
    }
});

router.post('/addItem', (req, res) => {
    const { orderId, itemId, quantity } = req.body;
    Order.addItem(orderId, itemId, quantity, (err) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({ message: 'Item added to order' });
    });
});

router.post('/processPayment', (req, res) => {
    const { orderId } = req.body;
    Order.processPayment(orderId, (err) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({ message: 'Payment processed and order status updated' });
    });
});

router.post('/complete', (req, res) => {
    const { orderId } = req.body;
    Order.complete(orderId, (err) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({ message: 'Order marked as completed' });
    });
});

router.get('/status', (req, res) => {
    Order.getAll((err, orders) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(orders);
    });
});

module.exports = router;
