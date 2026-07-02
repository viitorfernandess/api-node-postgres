import ordersRepository from "../repositories/orders-repository.js"
import customersRepository from "../repositories/customers-repository.js"

class OrdersController {
    async index(req, res) {
        const orders = await ordersRepository.findAll()

        return res.json(orders)
    }

    async show(req, res) {
        const id = req.params.id

        const order = await ordersRepository.findById(id)

        return res.json(order)
    }

    async create(req, res) {
        const { customerId } = req.params
        const { description, amount } = req.body

        // Validações de entrada
        if (typeof description !== "string") {
            return res.status(400).json({ message: "Description is required" })
        }

        if (typeof amount !== "number") {
            return res.status(400).json({ message: "Amount must be a number" })
        }

        // Regra de negócio
        const customer = await customersRepository.findById(customerId)
        if (!customer) {
           return res.status(404).json({ message: "Customer not found" })
        }

        const newOrder = await ordersRepository.create(customerId, description, amount)

        return res.json(newOrder)
    }

    async update(req, res) {
        const { id } = req.params
        const { description, amount } = req.body

        // Validações de entrada
        if (typeof description !== "string") {
            return res.status(400).json({ message: "Description is required" })
        }

        if (typeof amount !== "number") {
            return res.status(400).json({ message: "Amount must be a number" })
        }

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

        const deletedOrder = await ordersRepository.delete(id)

        return res.json(deletedOrder)
    }
}

export default new OrdersController