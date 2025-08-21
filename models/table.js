const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db.js')

const Table = sequelize.define('table', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
  }
}, {
  modelName: 'table',
    timestamps: true

});

module.exports=Table;