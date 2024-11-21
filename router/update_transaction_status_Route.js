const express=require('express')
const {update_transaction_status}=require('../controllers/update_transaction_status')

const router=express.Router()

router.put('/api/transactions/:transaction_id',update_transaction_status)

module.exports = router;