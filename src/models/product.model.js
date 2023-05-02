const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/db.connection');
const Category = require("./category.model")

class Product extends Model {
}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        }, description: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        }, price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            unique: false
        }, image_url: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
    },
    {
        sequelize,
        modelName: 'product',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

Category.hasMany(Product, {
    foreignKey: 'category_id'
})

Product.belongsTo(Category, {
    foreignKey: 'category_id'
})

module.exports = Product;