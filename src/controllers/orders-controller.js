import ordersRepository from "../repositories/orders-repository.js"
import customersRepository from "../repositories/customers-repository.js"
import AppError from "../errors/AppError.js"

class OrdersController {
    async index(req, res, next) {
        const orders = await ordersRepository.findAll()

        return res.json(orders)
    }

    async show(req, res, next) {
        try {
            const { id } = req.params

            const order = await ordersRepository.findById(id)
            if (!order) {
                throw new AppError("Order not found", 404)
            }

            return res.json(order)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const { customerId } = req.params

            const { description, amount } = req.body

            const customer = await customersRepository.findById(customerId)
            if (!customer) {
                throw new AppError("Customer not found", 404)
            }

            const newOrder = await ordersRepository.create(
                customerId,
                description,
                amount
            )

            return res.status(201).json(newOrder)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res) {
        const { id } = req.params
        const { description, amount } = req.body

        // Regra de negócio
        const order = await ordersRepository.findById(id)

        if (!order) {
            return res.status(404).json({ message: "Order not found" })
        }

        const updatedOrder = await ordersRepository.update(id, description, amount)

        return res.json(updatedOrder)
    }

    async delete(req, res) {
        const { id } = req.params

        // Regra de negócio
        const order = await ordersRepository.findById(id)
        if (!order) {
            return res.status(404).json({ message: "Order not found" })
        }

        const deletedOrder = await ordersRepository.delete(id)

        return res.json(deletedOrder)
    }
}

export default new OrdersController