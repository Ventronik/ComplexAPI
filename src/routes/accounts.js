const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/banking')

router.get('/', ctrl.getAllAccounts)
router.get('/:id', ctrl.getOneAccount)
router.post('/', ctrl.createAccount)
router.put('/:id', ctrl.updateAccount)
router.delete('/:id', ctrl.deleteAccount)

router.put('/:id/transactions/:transaction_id', ctrl.updateTransaction)
router.delete('/:id/transactions/:transaction_id', ctrl.deleteTransaction)

module.exports = router
