const express = require('express');

const router = express.Router();

const premiumController = require('../controller/premium')

const authMiddleware = require('../middleware/auth')

router.get('/premium/showleaderboard', authMiddleware.authenticate, premiumController.getLeaderboard)

module.exports = router;