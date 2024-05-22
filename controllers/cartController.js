const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.addItemToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id; // Asumiendo que el ID del usuario está disponible en req.user

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        res.status(200).send(cart);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.removeItemFromCart = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).send({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        await cart.save();
        res.status(200).send(cart);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getCart = async (req, res) => {
    const userId = req.user.id;

    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');

        if (!cart) {
            return res.status(404).send({ message: 'Cart not found' });
        }

        res.status(200).send(cart);
    } catch (error) {
        res.status(500).send(error);
    }
};
