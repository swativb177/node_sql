const Joi = require('joi');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const User = require('../models/user');

const schema = Joi.object({
  firstName: Joi.string().min(2).max(50).required().messages({
    'string.base': '"firstName" should be a type of "text"',
    'string.empty': '"firstName" cannot be an empty field',
    'string.min': '"firstName" should have a minimum length of {#limit}',
    'string.max': '"firstName" should have a maximum length of {#limit}',
    'any.required': '"firstName" is a required field',
  }),
  lastName: Joi.string().min(2).max(50).required().messages({
    'string.base': '"lastName" should be a type of "text"',
    'string.empty': '"lastName" cannot be an empty field',
    'string.min': '"lastName" should have a minimum length of {#limit}',
    'string.max': '"lastName" should have a maximum length of {#limit}',
    'any.required': '"lastName" is a required field',
  }),
  password: Joi.string().min(2).max(50).required().messages({
    'string.base': '"lastName" should be a type of "text"',
    'string.empty': '"lastName" cannot be an empty field',
    'string.min': '"lastName" should have a minimum length of {#limit}',
    'string.max': '"lastName" should have a maximum length of {#limit}',
    'any.required': '"lastName" is a required field',
  }),
  mobile: Joi.string().min(2).max(50).pattern(/^[6-9][0-9]{9}$/).required().messages({
    'string.empty': 'Mobile number is required', 
    'string.pattern.base': 'Mobile number must start with 6-9 and have exactly 10 digits',  
    'string.min': 'Mobile number must be at least 2 characters long', 
    'string.max': 'Mobile number must be less than 50 characters long'  
  }),
  email: Joi.string().min(2).max(50).pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required().messages({
    'string.empty': 'email address is required', 
    'string.pattern.base': 'the emial address invalid,please enter valid email address',  
    'string.min': 'email address must be at least 2 characters long', 
    'string.max': 'email address must be less than 50 characters long'  
  })
});

const create = async (req, res) => {
  try {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const { firstName, lastName, password,mobile,email } = req.body;

    const existingUser = await User.findOne({ where: { [Op.or]: [{ mobile }, { email }] } });
    if (existingUser) {
    if (existingUser.mobile===mobile) {
      return res.status(400).json({
        message: `The mobile "${mobile}" is already taken. Please choose a different one.`,
      });
    }

    if (existingUser.email===email) {
      return res.status(400).json({
        message: `The mobile "${email}" is already taken. Please choose a different one.`,
      });
    }
  }

    const hashedPassword = await bcrypt.hash(password, 10); 

    const data = await User.create({
      firstName,
      lastName,
      password: hashedPassword, 
      mobile,
      email
    });

    res.status(200).send({messege: "the user added succeffuly",data});
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server Error' });
  }
};

const fetch = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    if (isNaN(userId)) {  
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findOne({
      where: { id: userId },  
    });

    if (!user) {
      return res.status(404).json({
        message: `User with ID ${userId} not found.`,
      });
    }

    res.status(200).json({
      message: 'User found',
      user: user,  
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server Error' });
  }
};

const update = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const { firstName, lastName, address, password } = req.body;

    if (!firstName && !lastName && !address && !password) {
      return res.status(400).json({
        message: 'Please provide at least one field (firstName, lastName, address, or password) to update.',
      });
    }

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({
        message: `User with ID ${userId} not found.`,
      });
    }

    let updatedPassword = user.password;
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.update({
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      address: address || user.address,
      password: updatedPassword,
    });

    res.status(200).json({
      message: 'User successfully updated',
      user: updatedUser,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server Error' });
  }
};

const Delterow = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    if (isNaN(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        message: `User with ID ${userId} not found.`,
      });
    }
    if(!user.status){
      return res.status(404).json({
        message: `User already delted.`,
      });
    }

    const updatedUser = await user.update({
      status: false
    });

    res.status(200).json({
      message: 'User successfully deleted'
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server Error' });
  }
};




module.exports = {create,fetch,update,Delterow};