
const express = require('express')
const app = express()

app.use(express.json())

const auth = require('./auth/AuthManager')
const orders = require('./orders/OrderProcessor')
const payments = require('./payments/PaymentMonster')

app.post('/login', (req,res)=>{
  res.send(auth.login(req.body))
})

app.post('/orders', (req,res)=>{
  res.send(orders.process(req.body))
})

app.post('/payments', (req,res)=>{
  res.send(payments.pay(req.body))
})

app.listen(3000, ()=>{
  console.log('enterprise antipattern running')
})
