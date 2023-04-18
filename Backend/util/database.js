const Sequelize = require('sequelize')

const sequelize = new Sequelize('bookingapp', 'root', 'Abhi@1234', {
    dialect: 'mysql',
    host: 'localhost'
})
module.exports = sequelize;