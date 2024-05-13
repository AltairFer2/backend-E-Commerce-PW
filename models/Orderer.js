const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    orderItems: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    paymentInfo: {
        method: { type: String, required: true },
        paymentId: { type: String, required: true }
    },
    paidAt: { type: Date },
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true, enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
    deliveryAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    }
}, { timestamps: true });

const Order = mongoose.model('Orders', orderSchema);

module.exports = Order;
