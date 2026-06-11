import customersRepository from "../repositories/customers.repository.js"

class CustomersController {
    async index(req, res) {
        const customers = await customersRepository.findAll()

        return res.json(customers)
    }

    async show(req, res) {
        const id = req.params.id

        const customer = await customersRepository.findById(id)

        return res.json(customer)
    }

    async create(req, res) {
        const { name, email } = req.body

        const newCustomer = await customersRepository.create(name, email)

        return res.json(newCustomer)
    }

}

export default new CustomersController()