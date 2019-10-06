const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).send({ error: "No token provide" })

    const parts = authHeader.split(' ');

    if(!parts.length === 2)
        return res.status(401).send({ error: "Token error" })

    const [scheme, token] = parts;

    if(!scheme === 'Bearer')
        return res.status(401).send({ error: "Token mal formatted" })

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Token invalid' });

        req.userId = decoded.id;
        return next();
    })
}