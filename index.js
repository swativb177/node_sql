const express = require('express')
const bodyParser = require('body-parser')
const userrout = require('./route/userrout');
const TableRoute = require('./route/table');

const {
  connectdb,sequelize
}=require('./config/db')
const app = express()
app.use(express.json());

app.use(bodyParser.json())

app.use("/user",userrout)
app.use("/table",TableRoute)

app.get('/', function (req, res) {
  res.send('Hello World')
})


//User.sync({ force: true });
//contact.sync({ force: true });
// User.drop()
// sequelize.sync({ force: true });

const start = async() => {
 try {
  await connectdb()
  await sequelize.sync({
    alter : true
  })
 } catch (error) {
  
 }
}

const error = (req,res)=>{
   return res.status(404).json({ message: 'Path Not Found' });
};

app.use('*', error);

app.listen(5000,()=>{
    console.log("App will run on: http://localhost:5000")
})


start();