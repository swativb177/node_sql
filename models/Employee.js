const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db.js'); 

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
  }
}, {
  tableName: 'employee',  // Optional: custom table name
  timestamps: true,        // Adds createdAt and updatedAt
});


module.exports = Employee;
