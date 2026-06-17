import ordersRepository from "../repositories/orders-repository.js"

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
        const { customerId, description, amount } = req.body

        const newOrder = await ordersRepository.create(customerId, description, amount)

        return res.json(newOrder)
    }
}

export default new OrdersController