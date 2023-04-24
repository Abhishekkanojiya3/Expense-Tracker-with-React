const Expense = require('../models/expense')
const sequelize = require('../util/database')
const AWS = require('aws-sdk')
const DownloadFile = require('../models/downloadfile')

function isStringInValid(string) {
    if (string === undefined || string === null || string.length === 0) {
        return true;
    } else {
        return false;
    }
}

exports.postAddExpense = async(req, res, next) => {
    try {
        const t = await sequelize.transaction()
        const spentMoney = req.body.spentMoney;
        const Description = req.body.Description;
        const Category = req.body.Category;
        console.log(spentMoney)
        console.log(Description)
        console.log(Category)

        if (isStringInValid(Description) || isStringInValid(Category) || spentMoney == undefined || spentMoney === null || spentMoney < 0) {
            return res.status(400).json({ err: "Bad parameters" })
        }

        const expense = await req.user.createExpense({
            spentMoney: spentMoney,
            Description: Description,
            Category: Category
        }, { transaction: t })
        await req.user.update({
            totalexpense: req.user.totalexpense + Number.parseInt(spentMoney)
        }, { transaction: t })
        await t.commit();
        return res.status(201).json(expense)
    } catch (err) {
        console.log(err);
        await t.rollback();
        return res.status(500).json({ error: err, success: false })
    }
}

exports.getExpenses = async(req, res, next) => {
    try {
        const expenses = await req.user.getExpenses()
        return res.status(200).json(expenses)
        const page = parseInt(req.query.page) || 1; // current page number
        const size = parseInt(req.query.size) || 10; // number of items per page
        const offset = (page - 1) * size; // starting index of items for the current page
        const limit = size; // number of items to return

        const { count, rows } = await Expense.findAndCountAll({
            where: { userId: req.user.id },
            offset,
            limit,
        });

        const totalPages = Math.ceil(count / size);

        return res.status(200).json({
            expenses: rows,
            total: count,
            totalPages,
            currentPage: page,
            pageSize: size,
        });

    } catch (err) {
        return res.status(500).json({ error: err, success: false })
    }
}

exports.deleteExpense = async(req, res, next) => {
    try {
        const t = await sequelize.transaction();
        const expenseId = req.params.expenseId;

        if (expenseId == undefined || expenseId.length === 0) {
            return res.status(400).json({ success: false, message: "Bad parameters" })
        }

        const expenses = await req.user.getExpenses({ where: { id: expenseId } }, { transaction: t })
        const expense = expenses[0]
        expense.destroy();
        await req.user.update({
            totalexpense: req.user.totalexpense - expense.spentMoney
        }, { transaction: t })

        await t.commit();

        return res.status(200).json({ success: true, message: "Deleted successfully" })
    } catch (err) {
        const t = await sequelize.transaction();

        await t.rollback();
        return res.status(500).json({ error: err, success: false })
    }
}
const uploadToS3 = (data, filename) => {
    const BUCKET_NAME = process.env.AWS_IAM_BUCKET_NAME;
    const IAM_USER_KEY = process.env.AWS_IAM_ACCESS_KEY;
    const IAM_USER_SECRET = process.env.AWS_IAM_SECRET_KEY;

    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,

    })


    var params = {
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: data,
        ACL: 'public-read'
    }

    return new Promise((resolve, reject) => {
        s3bucket.upload(params, (err, s3response) => {
            if (err) {
                console.log("Something went wrong", err)
                reject("Something went wrong")
            } else {
                console.log("success", s3response)
                console.log(s3response.Location)
                resolve(s3response.Location)
            }
        })
    })
}

exports.getDownloadExpense = async(req, res, next) => {
    try {
        const expenses = await req.user.getExpenses();
        console.log(expenses)

        const userId = req.user.id;
        const stringifiedExpenses = JSON.stringify(expenses);

        const filename = `Expense${userId}/${new Date()}.txt`;

        const fileURL = await uploadToS3(stringifiedExpenses, filename);
        console.log(">>>>>>>", fileURL)
        req.user.createDownloadfile({ fileURL })
        res.status(200).json({ file: fileURL, message: 'done', success: true })
    } catch (err) {
        console.log(err)
        res.status(500).json({ file: "", success: false, error: err })
    }

}

exports.getDownloadHistory = async(req, res, next) => {
    const downloadHistory = await req.user.getDownloadfiles()
    res.status(200).json(downloadHistory)
}