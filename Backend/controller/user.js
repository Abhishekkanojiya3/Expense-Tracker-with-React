const User = require('../models/user')
const bcrypt = require("bcrypt")

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
        const saltrounds = 10;
        bcrypt.hash(password, saltrounds, async(err, hash) => {
            console.log(err)
            await User.create({
                email: email,
                password: hash
            })
            console.log('User created');
            res.status(201).json({ message: "You are successfully signed up" })
        })

    } catch (err) {
        console.log('Error:', err);
        res.status(500).json({ err: "Email_exist" })
    }
}

exports.postLoginUser = async(req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        console.log('email:', email);
        console.log('password:', password);
        if (isStringInvalid(email) || isStringInvalid(password)) {
            return res.status(400).json({ err: "Email id or password is missing", success: false })
        }
        const users = await User.findAll({ where: { email: email } })
        const user = users[0]
        console.log('user:', user);
        if (!user) {
            console.log('user not found');
            return res.status(404).json({ err: "user not found", success: false })
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                throw new Error("Something went wrong")
            }
            if (result === true) {
                console.log('User logged in successfully');
                res.status(200).json({ message: "User logged in successfully", success: true })
            } else {
                res.status(401).json({ err: "Incorrect Password", success: false })
            }
        })
    } catch (err) {
        res.status(500).json({ message: err, success: false })
    }
}