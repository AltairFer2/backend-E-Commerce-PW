const express = require('express');
const { addItemToCart, removeItemFromCart, getCart } = require('../controllers/cartController');
const auth = require('../middleware/auth'); // Middleware para autenticar al usuario
const router = express.Router();

router.post('/cart', auth, addItemToCart);
router.delete('/cart', auth, removeItemFromCart);
router.get('/cart', auth, getCart);

module.exports = router;
