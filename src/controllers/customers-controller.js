import customersRepository from "../repositories/customers-repository.js"
import ordersRepository from "../repositories/orders-repository.js"

class CustomersController {
    async index(req, res) {
        const customers = await customersRepository.findAll()

        return res.json(customers)
    }

    async show(req, res) {
        const { id } = req.params
        // Regra de negócio
        const customer = await customersRepository.findById(id)
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" })
        }
        return res.json(customer)
    }

    async create(req, res) {
        const { name, email } = req.body
        //Validação de entrada
        if (typeof name !== "string") {
            return res.status(400).json({ message: "Name must be a string" })
        }
        if (typeof email !== "string") {
            return res.status(400).json({ message: "Email must be a string" })
        }
        const newCustomer = await customersRepository.create(name, email)

        return res.json(newCustomer)
    }

    async update(req, res) {
        const { id } = req.params
        const { name, email } = req.body

        const updatedCustomer = await customersRepository.update(id, name, email)

        return res.json(updatedCustomer)
    }

    async delete(req, res) {
        const { id } = req.params

        const deletedCustomer = await customersRepository.delete(id)

        return res.json(deletedCustomer)
    }

    async orders(req, res) {
        const { id } = req.params

        const orders = await ordersRepository.findByCustomerId(id)

        res.json(orders)
    }

}

export default new CustomersController()