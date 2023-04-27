const {DataTypes} = require('sequelize');
const sequelize = require('../config/db.connection');

const ProductModel = sequelize.define('products', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }, price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    }, stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }, image_url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

const Category = require("./category.model")
ProductModel.belongsTo(Category, { foreignKey: 'category_id' });
Category.hasMany(ProductModel,{foreignKey:'id'})

module.exports = ProductModel;