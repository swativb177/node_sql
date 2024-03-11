const express = require('express')
var bodyParser = require('body-parser')
const User = require('./models/user')
const table = require('./models/table')
const app = express()
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World')
})

User.sync({ force: true });
// User.drop()

app.listen(3000,()=>{
    console.log("App will run on: http://localhost:3000")
})