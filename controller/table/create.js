const Joi = require('joi');
const Table =  require('../../models/table');

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

    const data = await Table.create(req.body);

    res.status(200).send({messege: "the table added succeffuly",data});
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server Error' });
  }
};

module.exports = {create};