const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js'); // No need to destructure if it's a default export

const Employee = sequelize.define('Employee', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email:{
    type: DataTypes.STRING,
  },
  mobile:{
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.TEXT,
  },
  role: {
    type: DataTypes.STRING,
  }
}, {
  tableName: 'Employee',  // Optional: custom table name
  timestamps: true,        // Adds createdAt and updatedAt
});

module.exports = Employee;
