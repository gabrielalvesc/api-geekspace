const mongoose = require('../../database/index');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpire: {
        type: Date,
        select: false
    },
    role: {
        type: String,
        default: 'CLIENT'
    },
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            select: true
        }
    ],
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CartItem'
        }
    ],
    shopping:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sale'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

