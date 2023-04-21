const Razorpay = require('razorpay');
const Order = require('../models/order')




exports.getPremiumMembership = (req, res, next) => {


    const rzp = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    })

    const amount = 2500;

    rzp.orders.create({ amount, currency: 'INR' }, (err, order) => {
        if (err) {
            res.status(403).json({ message: "error1" })
            console.log("eror1")
        }
        req.user.createOrder({ orderid: order.id, status: 'PENDING' })
            .then(() => {
                return res.status(201).json({ order, key_id: rzp.key_id })
            })
            .catch(err => {
                res.status(403).json({ message: "error2" })
            })

    })
}




exports.postUpdateTransactionStatus = async(req, res, next) => {
    try {
        const payment_id = req.body.payment_id;
        const order_id = req.body.order_id;

        const order = await Order.findOne({ where: { orderid: order_id } })

        const promise1 = order.update({ paymentid: payment_id, status: 'SUCCESSFUL' })

        const promise2 = req.user.update({ ispremiumuser: true })

        Promise.all([promise1, promise2]).then(() => {
            return res.status(202).json({ success: true, message: "transaction successful" })
        }).catch(err => {
            throw new Error(err)
        })
    } catch (err) {
        console.log(err)
        res.status(403).json({ message: "Something went wrong", error: err })
    }
}

exports.postFailedTransaction = async(req, res, next) => {
    try {

        const order_id = req.body.order_id;

        const order = await Order.findOne({ where: { orderid: order_id } })

        await order.update({ status: "FAILED" })

        return res.status(200).json({ message: "transaction failed" })
    } catch (err) {
        res.status(403).json({ message: "Something went wrong", error: err })
    }
}