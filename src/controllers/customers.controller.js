import customersRepository from "../repositories/customers.repository.js"

class CustomersController {
    async index(req, res) {
        const customers = await customersRepository.findAll()

        return res.json(customers)
    }
}

export default new CustomersController()