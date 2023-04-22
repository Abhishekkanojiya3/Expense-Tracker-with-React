const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const DownloadFile = sequelize.define('downloadfile', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    fileURL: Sequelize.STRING
})

module.exports = DownloadFile;