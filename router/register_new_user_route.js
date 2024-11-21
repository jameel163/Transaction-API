const express=require('express')
const {register_new_user}=require('../controllers/register_new_user')

const router=express.Router()

router.post('/api/register-new-user',register_new_user)

module.exports = router;