const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/db.connection');

class User extends Model {
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        }, type: {
            type: DataTypes.STRING,
            default: 'user'
        },
    },
    {
        sequelize,
        modelName: 'User',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

module.exports = User;