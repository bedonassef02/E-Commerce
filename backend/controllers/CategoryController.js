const express = require('express');
const {Op} = require('sequelize');
const Category = require('../models/category');

const router = express.Router();

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

// Get a single Category by ID
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({message: 'Category not found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

// Create a new customer
router.post('/', async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

// Update a customer by ID
router.put('/:id', async (req, res) => {
    try {
        const [rowsUpdated, [updatedCustomer]] = await Category.update(req.body, {
            where: {id: req.params.id},
            returning: true
        });
        if (rowsUpdated === 1) {
            res.json(updatedCustomer);
        } else {
            res.status(404).json({message: 'Category not found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

// Delete a customer by ID
router.delete('/:id', async (req, res) => {
    try {
        const rowsDeleted = await Category.destroy({
            where: {id: req.params.id}
        });
        if (rowsDeleted === 1) {
            res.status(204).send();
        } else {
            res.status(404).json({message: 'Category not found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

module.exports = router;