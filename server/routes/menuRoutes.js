const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');

router.post('/menus', async (req, res) => {
    const { name, description } = req.body;
    try {
        const newMenu = new Menu({ name, description, items: [] });
        await newMenu.save();
        res.status(201).json(newMenu);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/menus/:id/items', async (req, res) => {
    const { name, description, price } = req.body;
    try {
        const menu = await Menu.findById(req.params.id);
        if (!menu) return res.status(404).json({ message: 'Menu not found' });

        menu.items.push({ name, description, price });
        await menu.save();
        res.status(201).json(menu);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/menus', async (req, res) => {
    try {
        const menus = await Menu.find();
        res.json(menus);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
