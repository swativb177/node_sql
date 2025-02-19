const User = require('../models/user');

const create = async(req,res) => {
    try {
      const { firstName , lastName}= req.body
      
      const data = await User.create({
        firstName,
        lastName
      })
      res.status(200).send(data);
    } catch (error) {
        console.error(error)
    }
   }

   module.exports = {create};