const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('demo_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });

  const connectdb =  async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  module.exports= {
    connectdb,sequelize
  }