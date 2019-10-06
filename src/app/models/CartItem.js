const mongoose = require('../../database/index');

const CartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    quantity: {
        type: Number,
    },
    subTotal: {
        type: Number,
    },
});

const CartItem = mongoose.model('CartItem', CartItemSchema);

module.exports = CartItem;
