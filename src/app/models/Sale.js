const mongoose = require('../../database/index');

const SaleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartItem'
    }],
    total: {
        type: Number,
        required: true
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    }
});

const Sale = mongoose.model('Sale', SaleSchema);

module.exports = Sale;