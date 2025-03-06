const {
  DataTypes
}=require('sequelize')
const {
  sequelize
}=require('../config/db')

const User = sequelize.define('User', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  address:{
    type:DataTypes.TEXT
  },
  password:{
    type: DataTypes.STRING
  },
  mobile:{
    type : DataTypes.STRING
  },
  email:{
    type: DataTypes.STRING
  },
  status:{
    type: DataTypes.BOOLEAN,
    defaultValue : true
    
  }
},{
  // Other model options go here
  tableName: 'user',
  timestamps: true
});

module.exports = User;


