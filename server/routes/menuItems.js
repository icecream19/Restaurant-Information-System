const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuItem');

router.post('/create', (req, res) => {
    MenuItem.create(req.body, (err, itemId) => {
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
    MenuItem.update(req.body, (err) => {
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
