const {DataTypes} = require('sequelize');
const sequelize = require('../config/db.connection');

const CategoryModel = sequelize.define('categories', {
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
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = CategoryModel;