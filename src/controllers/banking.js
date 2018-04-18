const id = require('shortid')
const model = require('../models/banking')

function getAllAccounts ( req, res, next ) {
  const data = model.getAllAccounts()
  res.status(200).json({ data })
}

function createAccount ( req, res, next ) {
  const result = model.createAccount(req.body)

  if (result.errors) {
    return next({ status: 400, message: `Could not create new account`, errors: result.errors })
  }

  res.status(201).json({ data: result })
}

function getOneAccount ( req, res, next ) {
  const id = req.params.id
  const result = model.getOneAccount(id)

  if (result.errors) {
    return next({ status: 404, message: `Could not find account with id of ${id}`, errors: result.errors })
  }

  res.status(200).json({ data: result })
}

function updateAccount ( req, res, next ) {
  const toUpdate = model.updateAccount(req)
  if (toUpdate.errors) {
    return next({ status: 404, message: `Could not find account with id of ${req.params.id}`, errors: toUpdate.errors })
  }

  res.status(200).json({ data: toUpdate })
}

function deleteAccount ( req, res, next ) {
  const toDelete = model.deleteAccount(req)
  if(toDelete.data){
    return res.status(200).send({ data: toDelete.data })
  } else if (toDelete.errors) {
    return next({ status:404, message: `Could not find account with id of ${req.params.id}`, errors: toDelete.errors})
  }
}

function updateTransaction( req, res, next ) {
  
  let result = model.updateTransaction(req)

    res.status(201).json({ data: result })
}

function deleteTransaction( req, res, next ) {

  let result = model.deleteTransaction(req)

    res.status(201).json({ data: result })
}

module.exports = { getAllAccounts, createAccount, getOneAccount, updateAccount, deleteAccount, updateTransaction, deleteTransaction}
