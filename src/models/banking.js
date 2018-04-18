const id = require('shortid')
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'data.json')
let accounts = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
// fs.writeFileSync(filePath, JSON.stringify(accounts))   ------- FOR WRITING TO FILE USE LIBERALLY


function getAllAccounts () {
  return accounts
}


function getOneAccount (id) {
  const account = accounts.find(account => account.id === id)
  const errors = []

  let response
  if (!account) {
    errors.push(`account with ${id} not found`)
    response = { errors }
  } else {
    response = account
  }

  return response
}


function createAccount (body) {
  const errors = []
  const name = body.name
  const bankName = body.bankName
  const description = body.description

  let response
  if (!name || !bankName || !description) {
    errors.push('Missing field is required')
    response = { errors }
  } else {
    const account = { id: id(), name, bankName, description, 'transactions': [] }
    accounts.push(account)
    response = account
  }
  fs.writeFileSync(filePath, JSON.stringify(accounts))
  return response
}

function updateAccount (update) {
  let accountToUpdate = getOneAccount(update.params.id)
  if(update.body.name) accountToUpdate.name = update.body.name
  if(update.body.bankName) {accountToUpdate.bankName = update.body.bankName}
  if(update.body.description) {accountToUpdate.description = update.body.description}
  fs.writeFileSync(filePath, JSON.stringify(accounts))

  return accountToUpdate
}


function deleteAccount (toDelete) {
  let accountToDelete = getOneAccount(toDelete.params.id)

  if (accountToDelete) {
    accounts = accounts.filter(account => account.id !== toDelete.params.id)
    delete accountToDelete
    return { data: "Account Deleted"}
  }
  else {
    return { error: "Account Not Found"}
  }
  fs.writeFileSync(filePath, JSON.stringify(accounts))
}


function getOneTransaction (id) {
  const account = accounts.find(account => account.id === id)
  const errors = []

  let response
  if (!account) {
    errors.push(`account with ${id} not found`)
    response = { errors }
  } else {
    response = account
  }
  fs.writeFileSync(filePath, JSON.stringify(accounts))
  return response
}


function createTransaction (body) {
  const errors = []
  const account = accounts.find(account => account.id === body.account)
  const name = body.name
  const amount = body.amount
  const pending = body.pending || true
  let trans = {}

  let response

  if(!name || !amount || !pending) {

    if (!account) {
      errors.push('Account number is required')} else
    if (!name) {
      errors.push('Name of the account is required')} else
    if (!title ) {
      errors.push('Title is required')} else
    if (!amount) {
      errors.push('Amount is required')} else
    if (!pending) {
      errors.push('Status is required')}

    response = { errors }
  }

  if(errors.length === 0) {
    trans = { id: id(), name, amount, pending }
    account.transactions.push(trans)
    response = account.transactions
  } //else { response = {errors}}
  fs.writeFileSync(filePath, JSON.stringify(accounts))
  return response
}

function updateTransaction (req) {
  // console.log(req)
  const update = req.body
  let accountToUpdate = getOneAccount(req.params.id)
  const trans = accountToUpdate.transactions.find(transaction => transaction.id === req.params.transaction_id)

  if(update.name){trans.name = update.name}
  if(update.bankName){trans.bankName = update.bankName}
  if(update.description) {trans.description = update.description}
  if(update.pending) {trans.pending = update.pending}

  fs.writeFileSync(filePath, JSON.stringify(accounts))
  return accountToUpdate
}

function deleteTransaction (req) {
  let parentAccount = getOneAccount(req.params.id)

  const transactionLocation = parentAccount.transactions.find(transaction => transaction.id === req.params.transaction_id)
  const spot = parentAccount.transactions.indexOf(transactionLocation)

  let toDelete = parentAccount.transactions.splice(spot, 1)
  delete toDelete.id
  fs.writeFileSync(filePath, JSON.stringify(accounts))
  return toDelete
}

module.exports = {getAllAccounts,
                  createAccount,
                  getOneAccount,
                  updateAccount,
                  createTransaction,
                  getOneTransaction,
                  deleteAccount,
                  updateTransaction,
                  deleteTransaction }
