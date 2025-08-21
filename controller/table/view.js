const Joi = require('joi');
const Table = require('../../models/table');

const fetch = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    if (isNaN(userId)) {  
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await Table.findOne({
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

module.exports = { fetch };