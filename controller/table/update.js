const Joi = require('joi');
const Table = require('../../models/table');

const schema = Joi.object({
  firstName: Joi.string().min(2).max(50).optional().messages({
    'string.base': '"firstName" should be a type of "text"',
    'string.empty': '"firstName" cannot be an empty field',
    'string.min': '"firstName" should have a minimum length of {#limit}',
    'string.max': '"firstName" should have a maximum length of {#limit}',
  }),
  lastName: Joi.string().min(2).max(50).optional().messages({
    'string.base': '"lastName" should be a type of "text"',
    'string.empty': '"lastName" cannot be an empty field',
    'string.min': '"lastName" should have a minimum length of {#limit}',
    'string.max': '"lastName" should have a maximum length of {#limit}',
  })
}).min(1).messages({
  'object.min': 'Please provide at least one field (firstName, lastName) to update.'
});

const update = async (req, res) => {
  try {
    // Check HTTP method
    console.log(req.body);
    if (req.method !== 'PUT' && req.method !== 'PATCH') {
      return res.status(405).json({
        message: 'Method Not Allowed. Use PUT or PATCH for updates.',
        allowedMethods: ['PUT', 'PATCH']
      });
    }

    // Validate user ID
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Validate request body with Joi
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details.map(detail => detail.message)
      });
    }

    const { firstName, lastName } = value;

    // Check if user exists
    const user = await Table.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({
        message: `User with ID ${userId} not found.`,
      });
    }

    // Update user
    const updatedUser = await user.update({
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
    });

    res.status(200).json({
      message: 'User successfully updated',
      user: updatedUser,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { update };