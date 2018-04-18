const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const shortid = require('shortid')
const fs = require('fs')
const filePath = path.join(__dirname, 'data.json')


const app = express()
app.use(cors())
app.use(bodyParser.json())
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

const accountRoutes = require('./src/routes/accounts.js')
app.use('/accounts', accountRoutes)

const transactionRoutes = require('./src/routes/transactions.js')
app.use('/transactions', transactionRoutes)

//---------------------------------------------------------- Error Handling Here
app.use((err, req, res, next) => {
  console.error(err)
  let status = err.status || 500
  let message = err.message || "Internal Server Error"
    res.status(status).send({
      error: {
        message
      }
    })
})

app.use((req, res, next) => {
  res.status(400).json({ error: { message: 'Not found' }})
})

//---------------------------------------------------------- Listeners Here
const port = process.env.PORT || 3000

app.listen(port, () => {
		console.log(`started listening on port ${port}`)
})
 module.exports = app
