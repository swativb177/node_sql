const Joi = require('joi');
const bcrypt = require('bcrypt');
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
  })

});

const create = async (req, res) => {
  try {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: 'Validation failed',
        details: error.details,
      });
    }

    const { firstName, lastName, password } = req.body;

    const existingUser = await User.findOne({ where: { firstName } });

    if (existingUser) {
      return res.status(400).json({
        message: `The firstName "${firstName}" is already taken. Please choose a different one.`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10); 

    const data = await User.create({
      firstName,
      lastName,
      password: hashedPassword, 
    });

    res.status(200).send(data);
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



module.exports = {create,fetch,update};