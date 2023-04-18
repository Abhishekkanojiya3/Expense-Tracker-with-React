const express = require('express');

const bodyParser = require('body-parser');

const sequelize = require('./util/database')

const userRoutes = require('./routes/user')

const app = express();

var cors = require('cors');

app.use(cors());

// app.use(bodyParser.json({ extended: false }));
app.use(express.json());



app.use(userRoutes)

sequelize.sync()
    .then((result) => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err)
    })