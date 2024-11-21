const express = require('express');
const { createNewTransaction } = require('../controllers/create_transaction');
//const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/api/transactions/', createNewTransaction);

module.exports = router;