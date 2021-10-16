     const { DataTypes } = require('sequelize');
     const db = require('../db');
     
     const Log = db.define('log', {
      description: {
       type: DataTypes.STRING,
       allowNull: false
      },
      definition: {
      type: DataTypes.STRING,
      allowNull: false
     },
      result: {
      type: DataTypes.STRING,
      allowNull: false
     }
    //   owner: {
    //   type: DataTypes.INTEGER,  //! after this was coded out, I can now pull all tests from data
    //   allowNull: false
    // }

    });
    
    module.exports = Log;