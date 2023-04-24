const express = require('express');

const router = express.Router();

const expenseController = require('../controller/expense')

const authMiddleware = require('../middleware/auth')

router.post('/add-expense', authMiddleware.authenticate, expenseController.postAddExpense)

router.get('/expense/download', authMiddleware.authenticate, expenseController.getDownloadExpense)

router.get('/expense/downloadHistory', authMiddleware.authenticate, expenseController.getDownloadHistory)

router.get('/expense', authMiddleware.authenticate, expenseController.getExpenses)

router.get('/getExpense', authMiddleware.authenticate, expenseController.getExpenses)

router.delete('/delete-expense/:expenseId', authMiddleware.authenticate, expenseController.deleteExpense)


module.exports = router