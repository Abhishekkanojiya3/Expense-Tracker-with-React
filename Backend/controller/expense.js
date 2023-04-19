const Expense = require('../models/expense')

exports.postAddExpense = (req, res, next) => {
    const spentMoney = req.body.spentMoney;
    const Description = req.body.Description;
    const Category = req.body.Category;
    console.log(spentMoney)
    console.log(Description)
    console.log(Category)

    Expense.create({
            spentMoney: spentMoney,
            Description: Description,
            Category: Category

        })
        .then((result) => {
            console.log('Expense created:', result);

            res.json(result)
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.getExpenses = (req, res, next) => {
    Expense.findAll()
        .then((expenses) => {
            res.json(expenses)
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.deleteExpense = (req, res, next) => {
    const expenseId = req.params.expenseId;
    console.log(expenseId);
    Expense.destroy({ where: { id: expenseId } })
        .then(() => {
            console.log('Expense deleted');
            res.json({});
        })
        .catch((err) => {
            console.log(err);
        });
};