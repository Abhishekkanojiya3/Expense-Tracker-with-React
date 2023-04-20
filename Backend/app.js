const express = require('express');

const bodyParser = require('body-parser');

const sequelize = require('./util/database')

const userRoutes = require('./routes/user')

const expenseRoutes = require('./routes/expense')

const app = express();

var cors = require('cors');
const Expense = require('./models/expense');
const User = require('./models/user')

app.use(cors());

app.use(bodyParser.json({ extended: false }));
//app.use(express.json());

app.use(expenseRoutes)

app.use(userRoutes)

Expense.belongsTo(User);
User.hasMany(Expense)

sequelize.sync()
    .then((result) => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err)
    })