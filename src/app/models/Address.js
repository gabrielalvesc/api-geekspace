const mongoose = require('../../database/index');

const AddressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    street: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true,
        default: 'S/N'
    },
    neighborhood: {
        type: String,
        required: true
    },
    cep: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
   
});

const Address = mongoose.model('Address', AddressSchema);

module.exports = Address;