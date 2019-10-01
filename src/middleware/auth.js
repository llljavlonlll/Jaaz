const jwt = require('jsonwebtoken');
const User = require('../models/users');

// Authorization middleware
// Check if authorized
const auth = async (req, res, next) => {
    try {
        const token = 
            req.body.token ||
            req.query.token ||
            req.headers['x-access-token'] ||
            req.cookies.token ||
            req.header('Authorization').replace('Bearer ', ''); // For Postman testing (To be deleted)

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({
            _id: decoded._id,
            "tokens.token": token
        });

        if(!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();

    } catch(e) {
        res.status(401).send({error: "Please authenticate"});
    }
}

module.exports = auth;