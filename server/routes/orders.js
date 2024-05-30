const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Table = require('../models/table');

router.post('/create', (req, res) => {
    const { orderType, totalPrice } = req.body;
    if (!orderType || totalPrice === undefined) {
        console.error('Missing required fields:', req.body);
        return res.status(400).send({ message: 'Order type and total price are required' });
    }
    const status = 'Pending'; // Ensure new orders start with status 'Pending'
    if (orderType === 'dine-in') {
        Table.getAvailability((err, row) => {
            if (err) {
                console.error('Error getting table availability:', err);
                return res.status(500).send(err);
            }
            if (row.available_tables <= 0) {
                return res.status(400).send({ message: 'No tables available' });
            } else {
                Order.create({ orderType, totalPrice, status }, (err, orderId) => {
                    if (err) {
                        console.error('Error creating order:', err);
                        return res.status(500).send(err);
                    }
                    Table.updateAvailability(row.available_tables - 1, (err) => {
                        if (err) {
                            console.error('Error updating table availability:', err);
                            return res.status(500).send(err);
                        }
                        res.status(200).send({ orderId });
                    });
                });
            }
        });
    } else {
        Order.create({ orderType, totalPrice, status }, (err, orderId) => {
            if (err) {
                console.error('Error creating order:', err);
                return res.status(500).send(err);
            }
            res.status(200).send({ orderId });
        });
    }
});

router.post('/addItem', (req, res) => {
    const { orderId, itemId, quantity } = req.body;
    Order.addItem(orderId, itemId, quantity, (err) => {
        if (err) {
            console.error('Error adding item to order:', err);
            return res.status(500).send(err);
        }
        res.status(200).send({ message: 'Item added to order' });
    });
});

router.post('/processPayment', (req, res) => {
    const { orderId } = req.body;
    Order.processPayment(orderId, (err) => {
        if (err) {
            console.error('Error processing payment:', err);
            return res.status(500).send(err);
        }
        res.status(200).send({ message: 'Payment processed and order status updated to Paid' });
    });
});

router.post('/complete', (req, res) => {
    const { orderId } = req.body;
    console.log('Completing order:', orderId); // Debugging line
    Order.complete(orderId, (err) => {
        if (err) {
            console.error('Error completing order:', err);
            return res.status(500).send(err);
        }
        res.status(200).send({ message: 'Order marked as completed' });
    });
});

router.get('/status', (req, res) => {
    Order.getAll((err, orders) => {
        if (err) {
            console.error('Error fetching orders:', err);
            return res.status(500).send(err);
        }
        res.status(200).send(orders);
    });
});

module.exports = router;
