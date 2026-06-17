import ordersRepository from "../repositories/orders-repository"

class OrdersController {
    async index(req, res) {
        const orders = await ordersRepository.findAll()

        return res.json(orders)
    }
}