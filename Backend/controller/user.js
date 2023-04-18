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

exports.postLoginUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log('email:', email);
    console.log('password:', password);
    User.findAll({ where: { email: email } })
        .then((users) => {
            const user = users[0]
            console.log('user:', user);
            if (!user) {
                console.log('user not found');

                return res.status(404).json({ err: "user not found" })
            }

            if (user.password != password) {
                console.log('incorrect password');

                return res.status(401).json({ err: "incorrect password" })
            }
            console.log('User logged in successfully');
            res.status(200).json({ message: "User logged in successfully" })
        })
}