// controllers/productController.js
const Product = require('../models/Product');
const formidable = require('formidable');
const { s3Client } = require('./s3Client');

exports.createProduct = (req, res) => {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({ error: "La imagen no pudo ser subida" });
        }

        try {
            let product = new Product(fields);

            if (files.image) {
                // Subir archivo a S3 y guardar la URL en el producto
                const result = await uploadFileToS3(files.image);
                if (product.images) { // Asumiendo que el modelo ya incluye un campo de images
                    product.images.push(result.url);
                } else {
                    product.images = [result.url];
                }
            }

            await product.save();
            res.status(201).json(product);
        } catch (error) {
            res.status(400).json({ error: error.message || "Fallo al crear el producto" });
        }
    });
};

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getProductsByCategory = async (req, res) => {
    const { category } = req.params;

    try {
        const products = await Product.find({ category });
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
};
