const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const User = require('../models/User');
const authConfig = require('../../config/auth');

module.exports = {

    async login(req, res) {

        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password')

        if(!user)
            return res.status(400).send({ error: 'User not found' });

        if(!await bcrypt.compareSync(password, user.password))
            return res.status(400).send({ error: 'Invalid password' });

        user.password = undefined;

        const token = jwt.sign({ id: user.id}, authConfig.secret, {
            expiresIn: 86400
        })

        return res.send({user, token})

    }

}