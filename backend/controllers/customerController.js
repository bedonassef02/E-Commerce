const express = require('express');
const { Op } = require('sequelize');
const Customer = require('../models/customer');

const router = express.Router();

// Get all customers
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.json(customers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a single customer by ID
router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (customer) {
            res.json(customer);
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new customer
router.post('/', async (req, res) => {
    try {
        const customer = await Customer.create(req.body);
        res.status(201).json(customer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a customer by ID
router.put('/:id', async (req, res) => {
    try {
        const [rowsUpdated, [updatedCustomer]] = await Customer.update(req.body, {
            where: { id: req.params.id },
            returning: true
        });
        if (rowsUpdated === 1) {
            res.json(updatedCustomer);
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a customer by ID
router.delete('/:id', async (req, res) => {
    try {
        const rowsDeleted = await Customer.destroy({
            where: { id: req.params.id }
        });
        if (rowsDeleted === 1) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;