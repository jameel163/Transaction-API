const express=require('express')
const {get_specific_transaction}=require('../controllers/get_specific_transaction')

const router=express.Router()

router.get('/api/transactions/:transaction_id',get_specific_transaction)

module.exports = router;