const User = require('../models/user')

function isStringInvalid(string) {
    if (string === undefined || string === null || string.length === 0) {
        return true;
    } else {
        return false;
    }
}

exports.postSignUpUser = async(req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        console.log('email:', email);
        console.log('password:', password);
        if (isStringInvalid(email) || isStringInvalid(password)) {
            console.log('Bad parameters');
            return res.status(400).json({ err: "Bad parameters..Something is missing" })
        }

        await User.create({
            email: email,
            password: password
        })
        console.log('User created');
        res.status(201).json({ message: "You are successfully signed up" })

    } catch (err) {
        console.log('Error:', err);
        res.status(500).json({ err: "Email_exist" })
    }
}