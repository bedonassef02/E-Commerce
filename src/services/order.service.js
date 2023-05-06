const Order = require('../models/order.model');
const User = require("../models/user.model");
const OrderItem = require("../models/orderItems.model");

const getProductPriceById = async (id) => {
    const {ProductService} = require("../services/product.service")
    const productService = new ProductService()
    return (await productService.getById(id)).dataValues.price
}

const createOrderItems = async (order, order_items) => {
    let total_amount = 0
    order = order.dataValues
    const createdItems = await Promise.all(order_items.map(async (order_item) => {
        order_item = {...order_item, order_id: order.id}
        const product_id = order_item.product_id
        total_amount += await getProductPriceById(product_id) * order_item.quantity
        return await OrderItem.create({...order_item, product_id})
    }));
    return [createdItems, total_amount]
}

const deleteOrderItem = async (id) => {
    await OrderItem.destroy({where: {order_id: id}})
}
const updateOrderPrice = async (order, total_amount) => {
    await order.update({...order, total_amount: total_amount})
    order = {...order}.dataValues
    return order
}

class OrderService {
    async getAllOrders() {
        const users_orders = await User.findAll({
            attributes: ['id', 'username'],
            include: [{model: Order, attributes: ['id', 'total_amount']},
                {
                    model: Order,
                    include: {model: OrderItem, attributes: ['id', 'quantity', 'product_id']}
                }
            ]
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
        try {
            let createdOrder = await Order.create({total_amount: 0, user_id: order.user_id});
            const [createdItems, total] = await createOrderItems(createdOrder, order_items)
            createdOrder = await updateOrderPrice(createdOrder, total)
            return {...createdOrder, order_items: createdItems}
        } catch (error) {
            return error
        }
    }
}

class OrderDeletionService {
    async deleteOrder(id) {
        await deleteOrderItem(id)
        await Order.destroy({where: {id}});
    }
}

class OrderUpdateService {

    async updateOrder(order) {
        const order_items = order.order_items
        try {
            let updatedOrder = await Order.findOne({where: {id: order.order_id}});
            await deleteOrderItem(order.order_id)
            const [updatedItems, total] = await createOrderItems(updatedOrder, order_items)
            await updateOrderPrice(updatedOrder, total)
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