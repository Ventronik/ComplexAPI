const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/transactions')

router.post('/', ctrl.createTransaction)
// router.put('/:transactionid', ctrl.updateTransaction)
// router.delete('/', ctrl.deleteTransaction)

module.exports = router
