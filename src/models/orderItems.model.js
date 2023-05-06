const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/db.connection');
const Order = require("./order.model");
const Product = require("./product.model");

class OrderItems extends Model {
}

OrderItems.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false
        },
    },
    {
        sequelize,
        modelName: 'Order_items',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

Order.hasMany(OrderItems, {
    foreignKey: 'order_id'
})

OrderItems.belongsTo(Order, {
    foreignKey: 'order_id'
})

OrderItems.belongsTo(Product, {
    foreignKey: 'product_id'
})

module.exports = OrderItems;