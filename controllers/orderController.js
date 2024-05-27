// controllers/orderController.js
const Order = require('../models/Orderer');

exports.createOrder = async (req, res) => {
    try {
        console.log('Order Data:', req.body);
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).send(newOrder);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send(error);
    }
};
