const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/db.connection');

class Category extends Model {
}

Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:false
        },
    },
    {
        sequelize,
        modelName: 'category',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

module.exports = Category;