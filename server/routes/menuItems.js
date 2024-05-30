const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuItem');

router.post('/create', (req, res) => {
    const { name, description, price } = req.body;
    if (!name || !price) {
        return res.status(400).send({ message: 'Name and price are required' });
    }

    const parsedPrice = parseFloat(price); // Ensure price is a number
    if (isNaN(parsedPrice)) {
        return res.status(400).send({ message: 'Price must be a valid number' });
    }

    MenuItem.create({ name, description, price: parsedPrice }, (err, itemId) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({ itemId });
    });
});

router.get('/', (req, res) => {
    MenuItem.getAll((err, menuItems) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(menuItems);
    });
});

router.put('/update', (req, res) => {
    const { item_id, name, description, price } = req.body;
    const parsedPrice = parseFloat(price); // Ensure price is a number
    if (isNaN(parsedPrice)) {
        return res.status(400).send({ message: 'Price must be a valid number' });
    }

    MenuItem.update({ item_id, name, description, price: parsedPrice }, (err) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({ message: 'Menu item updated' });
    });
});

router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    MenuItem.delete(id, (err) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({ message: 'Menu item deleted' });
    });
});

module.exports = router;
