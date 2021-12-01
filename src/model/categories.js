const sequelize = require('../database/index')
const { DataTypes, Model } = require('sequelize');

const Post = require('./post');


class Categories extends Model {}

Categories.init({
    categorie:{
        type:DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'Categories',
    tableName: 'Categoriess'
})


Categories.hasMany(Post)
Post.belongsTo(Categories)

module.exports = Account    