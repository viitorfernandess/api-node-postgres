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
}

export default new CustomersController()