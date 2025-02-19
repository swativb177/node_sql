const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js')

const Contact = sequelize.define('User', {
  // Model attributes are defined here
  first_name: {
    type: DataTypes.STRING,
    //allowNull: false
  },
  last_name: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  permanant_address: {
    type: DataTypes.STRING,
  },
  current_address: {
    type: DataTypes.STRING,
  }
}, {
  // Other model options go here
});

module.exports = Contact; // Export your model