const id = require('shortid')
const model = require('../models/banking')

function createTransaction (req, res, next) {
  let result = model.createTransaction(req.body)

  res.status(201).json({ data: result })
}


// function updateTransaction( req, res, next ) {
//   let result = model.updateTransaction(req.body)
//     // if (result.errors) {
//     //   return next({ status: 400, message: `Could not create new transaction`, errors: result.errors })
//     // }
//
//     res.status(201).json({ data: result })
// }



module.exports = { createTransaction }
