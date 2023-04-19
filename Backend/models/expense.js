const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Expense = sequelize.define('expense', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    spentMoney: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    Description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Category: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
module.exports = Expense;