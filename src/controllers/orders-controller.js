import ordersRepository from "../repositories/orders-repository.js"

class OrdersController {
    async index(req, res) {
        const orders = await ordersRepository.findAll()

        return res.json(orders)
    }
}

export default new OrdersController