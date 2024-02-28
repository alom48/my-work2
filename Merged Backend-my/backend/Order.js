// models/Order.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    // Define the structure of your order document
    checkoutInput: {
        name: String,
        phone: String,
        email: String,
        address: String,
        city: String,
        FullAddress: String,
    },
    paymentType: String,
    totalPrice: Number,
    cartItems: [
        {
            title: String,
            quantity: Number
        }
    ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
