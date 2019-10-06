const Product = require('../models/Product');
const User = require('../models/User');

module.exports = {

    async newProduct(req, res) {

        const user = await User.findById(req.userId)

        if (user.role === 'CLIENT')
            return res.status(400).send({ error: 'Not authorized to perform this operation' })


        const { title, description, specification, price, stock, image, category, color, genre, size } = req.body;

        await Product.create({ title, description, specification, price, stock, image, category, color, genre, size });

        return res.status(200).send({ message: 'Ok' })

    },

    async getAllProducts(req, res) {

        try {
            const products = await Product.find();
            return res.send(products);

        } catch (error) {
            return res.status(400).send({ error: 'Could not perform this operation' })
        }

    },

    async getProduct(req, res) {

        const { product_id } = req.params;

        try {
            const product = await Product.findById(product_id);
            return res.send(product);
        } catch (error) {
            return res.status(400).send({ error: 'Could not perform this operation' })
        }

    } 
}