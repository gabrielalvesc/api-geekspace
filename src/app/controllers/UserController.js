const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Product = require('../models/Product');
const CartItem = require('../models/CartItem');

const authConfig = require('../../config/auth');

module.exports = {

    async store(req, res) {
        const { firstName, lastName, email, password, role } = req.body;

        try {

            if (await User.findOne({ email })) {
                return res.status(400).send({ error: 'User already exists' })
            }

            const salt = await bcrypt.genSaltSync(10);

            const hash = await bcrypt.hash(password, salt);

            const user = await User.create({ firstName, lastName, email, password: hash, role });

            user.password = undefined;

            const token = jwt.sign({ id: user.id }, authConfig.secret, {
                expiresIn: 86400
            })

            return res.send({ user, token });

        } catch (error) {
            console.log(error)
            return res.status(400).send({ error: 'Registration failed' })
        }
    },

    async getAllUsers(req, res) {

        const user = await User.findById(req.userId);

        if (user.role === 'CLIENT')
            return res.status(401).send({ error: 'Not authorized to perform this operation' })

        const users = await User.find();

        return res.send(users);

    },

    async getUser(req, res) {

        const { user_id } = req.params;

        let user = await User.findById(req.userId)

        if (user.role === 'CLIENT')
            return res.status(401).send({ error: "Not authorized to perform this operation" })

        user = await User.findById(user_id)

        return res.send(user)

    },

    async addToFavorites(req, res) {

        const { product_id } = req.params;

        const user = await User.findById(req.userId);

        if (!user)
            return res.status(400).send({ error: 'User not found' })

        const product = await Product.findById(product_id);

        if (!product)
            return res.status(400).send({ error: 'Product not found' })

        let exists = false;
        user.favorites.map(favorite => {
            if (favorite == product_id) {
                return exists = true;
            }
        })

        if (exists) {
            return res.status(400).send({ error: 'This product is already in your favorites list' })
        } else {
            await user.favorites.push(product);

            user.save();

            await User.findByIdAndUpdate(user._id, user, { new: true })

            return res.send({ message: "Product added to your favorites list", user })
        }




    },

    async addToCart(req, res) {

        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(400).send({ error: 'Product not found' })
        }

        const user = await User.findById(req.userId).populate({ path: 'cart', populate: { path: 'product' } });

        if (!user) {
            return res.status(400).send({ error: 'User not found' })
        }

        let exists = false;
        let auxItem = null;
        user.cart.map(item => {
            if (item.product._id == productId) {
                auxItem = item;
                return exists = true
            }
        })

        if (exists) {
            auxItem.quantity += 1;
            auxItem.subTotal = product.price * auxItem.quantity;
            auxItem.save();
            await CartItem.findOneAndUpdate({ productId }, auxItem, { new: true })
            res.send(user);
        } else {
            const subTotal = product.price * quantity;
            const cartItem = await CartItem.create({ product, quantity, subTotal });

            await user.cart.push(cartItem)

            user.save();

            // await User.findByIdAndUpdate(user._id, user, { new: true })

            return res.send({ message: 'top', user })
        }

    }

}