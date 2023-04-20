const jwt = require('jsonwebtoken');
const User = require('../models/user')

exports.authenticate = async(req, res, next) => {
    try {
        const token = req.header('Authorization');
        console.log(token)
        const userInfo = jwt.verify(token, 'secretKey')

        const user = await User.findByPk(userInfo.userId)

        req.user = user;
        console.log(req.user)
        next();
    } catch (err) {
        return res.status(401).json({ success: false })

    }

}