const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/db.connection');
const User = require("./user.model")

class Order extends Model {
}

Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        total_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            unique: false
        },
    },
    {
        sequelize,
        modelName: 'orders',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

User.hasMany(Order, {
    foreignKey: 'user_id'
})

Order.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = Order;