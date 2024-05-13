const mongoose = require('mongoose');

// Definición de subesquemas para las especificaciones
const ProcessorSchema = new mongoose.Schema({
    brand: String,
    model: String
});

const RamSchema = new mongoose.Schema({
    capacity: String,
    type: String
});

const StorageSchema = new mongoose.Schema({
    type: String,
    capacity: String
});

const SpecificationsSchema = new mongoose.Schema({
    processor: ProcessorSchema,
    ram: RamSchema,
    storage: StorageSchema,
    cabinetBrand: String
});

const ProductSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ['Monitor', 'Teclado', 'Mouse', 'Laptop', 'Audifonos', 'Equipo de cómputo']
    },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    specifications: SpecificationsSchema,
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
