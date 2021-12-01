const sequelize = require('../database/index')
const { DataTypes, Model } = require('sequelize');



class Role extends Model {}

Role.init({ 
    name:{
    type:DataTypes.STRING,
    allowNull: false
    },
    description:{
        type:DataTypes.STRING,
        allowNull: true,
    }
    },{
    sequelize,
    modelName: 'Role',
    tableName: 'roles'
})



module.exports = Role