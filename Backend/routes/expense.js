const express = require('express');

const router = express.Router();

const expenseController = require('../controller/expense')

router.post('/add-expense', expenseController.postAddExpense)

router.get('/getExpense', expenseController.getExpenses)

router.delete('/delete-expense/:expenseId', expenseController.deleteExpense)


module.exports = router