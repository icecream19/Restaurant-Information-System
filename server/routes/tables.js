const express = require('express');
const router = express.Router();
const Table = require('../models/table');

router.get('/', (req, res) => {
    Table.getAvailability((err, row) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(row);
    });
});

router.post('/update', (req, res) => {
    const { availableTables } = req.body;
    Table.updateAvailability(availableTables, (err) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({ message: 'Table availability updated' });
    });
});

module.exports = router;
