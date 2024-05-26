const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).send({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.user.id }; // Esto agrega el ID del usuario al request
        next();
    } catch (ex) {
        res.status(400).send({ message: 'Invalid token.' });
    }
};

module.exports = auth;
