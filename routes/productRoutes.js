// routes/productRoutes.js
const express = require('express');
const {
    createProduct, getProduct, getProducts, getProductsByCategory, updateProduct, deleteProduct
} = require('../controllers/productController');
const router = express.Router();

router.post('/product', createProduct);
router.get('/product/:id', getProduct);
router.get('/products/', getProducts);
router.get('/products/:category', getProductsByCategory);
router.put('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);

module.exports = router;
