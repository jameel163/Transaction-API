const express = require('express');
const { get_all_transaction_of_specific_user } = require('../controllers/get_specific_user_transaction');
//const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/api/transactions/', get_all_transaction_of_specific_user);

module.exports = router;