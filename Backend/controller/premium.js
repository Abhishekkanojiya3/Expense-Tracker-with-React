const User = require('../models/user')
const Expense = require('../models/expense');
const sequelize = require('../util/database');

exports.getLeaderboard = async(req, res, next) => {

    //const expenses = await Expense.findAll({ include: [{ model: User, attributes: ["name"] }], attributes: ["userid", [sequelize.fn("SUM", sequelize.col("spentMoney")), "expenseSum"]], group: "userid" })

    // console.log(JSON.stringify(expenses, null, 2))
    // res.status(200).json(expenses)
    const leaderboardofusers = await User.findAll({
        attributes: ['name', 'totalexpense'],
        order: [
            ['totalexpense', 'DESC']
        ]
    })
    res.status(200).json(leaderboardofusers)

}