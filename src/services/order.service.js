const Order = require('../models/order.model');
const User = require("../models/user.model");
const Product = require("../models/product.model");
const OrderItem = require("../models/orderItems.model");
const Category = require("../models/category.model");
const {or} = require("sequelize");

const getProductPrice = async (id) => {
    const {ProductService} = require("../services/product.service")
    const productService = new ProductService()
    return (await productService.getProductById(id)).dataValues.price
}

class OrderService {

    async getAllOrders() {
        const users_orders = await User.findAll({
            attributes: ['id', 'username'],
            include: [{model: Order, attributes: ['id', 'total_amount']},
                {model: Order, include: {model: OrderItem, attributes: ['id', 'quantity', 'product_id']}}]
        })
        return users_orders
    }

    async getOrderById(id) {
        try {
            return await Order.findOne({
                where: {id},
                attributes: ['id', 'total_amount'],
                include: [
                    {
                        model: OrderItem,
                        attributes: ['id', 'quantity', 'product_id']
                    },
                ]
            })
        } catch (error) {
            return error
        }
    }
}

class OrderCreationService {
    async createOrder(order) {
        const order_items = order.order_items
        let total_amount = 0
        try {
            let createdOrder = await Order.create({total_amount, user_id: order.user_id});
            const createdItems = await Promise.all(order_items.map(async (order_item) => {
                order_item = {...order_item, order_id: createdOrder.dataValues.id}
                const product_id = order_item.product_id
                total_amount += await getProductPrice(product_id) * order_item.quantity
                return await OrderItem.create({...order_item, product_id})
            }));
            await createdOrder.update({...createdOrder, total_amount: total_amount})
            createdOrder = {...createdOrder}.dataValues
            return {...createdOrder, order_items: createdItems}
        } catch (error) {
            return error
        }
    }
}

class OrderDeletionService {
    async deleteOrder(id) {
        await OrderItem.destroy({where: {order_id: id}})
        await Order.destroy({where: {id}});
    }
}

class OrderUpdateService {

    async updateOrder(order) {
        const order_items = order.order_items
        let total_amount = 0
        try {
            let updatedOrder = await Order.findOne({where:{id:order.order_id}});
            await OrderItem.destroy({where: {order_id: order.order_id}})
            const updatedItems = await Promise.all(order_items.map(async (order_item) => {
                order_item = {...order_item, order_id: updatedOrder.dataValues.id}
                const product_id = order_item.product_id
                total_amount += await getProductPrice(product_id) * order_item.quantity
                return await OrderItem.create({...order_item, product_id})
            }));
            await updatedOrder.update({updatedOrder, total_amount: total_amount})
            updatedOrder = {...updatedOrder}.dataValues
            return {...updatedOrder, order_items: updatedItems}
        } catch (error) {
            return error
        }
    }
}

module.exports = {
    OrderService,
    OrderCreationService,
    OrderDeletionService,
    OrderUpdateService
}