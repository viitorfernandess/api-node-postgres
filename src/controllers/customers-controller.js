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

        const customer = await customersRepository.findByEmail(email)
        if (customer) {
            return res.status(409).json({ message: "Email already exists" })
        }

        const newCustomer = await customersRepository.create(name, email)

        return res.json(newCustomer)
    }

    async update(req, res) {
        const { id } = req.params
        const { name, email } = req.body
        if (!name) {
            return res.status(400).json({ message: "Name is required" })
        }
        if (!email) {
            return res.status(400).json({ message: "Email is required" })
        }

        // Validação de entrada
        if (typeof name !== "string") {
            return res.status(400).json({ message: "Name must be a string" })
        }
        if (typeof email !== "string") {
            return res.status(400).json({ message: "Email must be a string" })
        }

        const emailRegex = /\S+@\S+\.\S+/
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email" })
        }
        //Regra de negócio 
        const customer = await customersRepository.findById(id)
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" })
        }

        const customerByEmail = await customersRepository.findByEmail(email)
        if (customerByEmail && customerByEmail.id !== Number(id)) {
            return res.status(409).json({ message: "Email already exists" })
        }
        const updatedCustomer = await customersRepository.update(id, name, email)

        return res.json(updatedCustomer)
    }

    async delete(req, res) {
        const { id } = req.params
        // Regra de negócio
        const customer = await customersRepository.findById(id)
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" })
        }

        const deletedCustomer = await customersRepository.delete(id)

        return res.json(deletedCustomer)
    }

    async orders(req, res) {
        const { id } = req.params
        //Regra de negócio
        const customer = await customersRepository.findById(id)
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" })
        }

        const orders = await ordersRepository.findByCustomerId(id)

        return res.json(orders)
    }

}

export default new CustomersController()