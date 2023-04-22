const express = require('express');

const dotenv = require('dotenv')

dotenv.config()

const bodyParser = require('body-parser');

const sequelize = require('./util/database')

const userRoutes = require('./routes/user')

const expenseRoutes = require('./routes/expense')

const purchaseRoutes = require('./routes/purchase')

const premiumRoutes = require('./routes/premium')

const forgotPasswordRoutes = require('./routes/forgotPassword')
const DownloadFile = require('./models/downloadfile')

const app = express();

var cors = require('cors');
const Expense = require('./models/expense');
const User = require('./models/user')
const Order = require('./models/order')
const Forgotpassword = require('./models/forgotPassword')

app.use(cors());

app.use(bodyParser.json({ extended: false }));
//app.use(express.json());

app.use(expenseRoutes)

app.use(userRoutes)

app.use(purchaseRoutes)

app.use(premiumRoutes)

app.use(forgotPasswordRoutes)

Expense.belongsTo(User);
User.hasMany(Expense)

Order.belongsTo(User);
User.hasMany(Order)

Forgotpassword.belongsTo(User);
User.hasMany(Forgotpassword)
DownloadFile.belongsTo(User);
User.hasMany(DownloadFile)

sequelize.sync()
    .then((result) => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err)
    })