// controllers/orderController.js
const Order = require('../models/Orderer');

exports.createOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).send(newOrder);
    } catch (error) {
        res.status(500).send(error);
    }
};
