const Sale = require('../models/Sale');
const User = require('../models/User');
const Address = require('../models/Address');
const CartItem = require('../models/CartItem');

module.exports = {

    async newSale(req, res) {

        const { street, number, neighborhood, cep, city, state } = req.body;

        const user = await User.findById(req.userId).populate({ path: 'cart', populate: { path: 'product' } });

        let total = 0;
        if (user.cart.length != 0) {
            user.cart.map(item => {
                total += item.subTotal;
            });
        }

        const address = await Address.create({ user, street, number, neighborhood, cep, city, state })
        sale = await Sale.create({ user, cart: user.cart, total, address });

        user.cart = [];

        user.shopping.push(sale)

        user.save();

        return res.status(200).send({ message: 'Succefull sale' })
    },

    async getAllSales(req, res) {

        const user = await User.findById(req.userId);

        if (user.role === 'CLIENT') {
            return res.status(400).send({ error: 'User unauthorized' })
        }
        
        const sales = await Sale.find();

        return res.send(sales);

    },

    async getSale(req, res) {
        
        const { sale_id } = req.params;

        const sale = await Sale.findById(sale_id).populate({path: 'cart', populate:{path: 'product'}});

        console.log(sale);
        return res.send(sale);
    }


}
