import customersRepository from "../repositories/customers-repository.js"
import ordersRepository from "../repositories/orders-repository.js"
import AppError from "../errors/AppError.js"

class CustomersController {
    async index(req, res) {
        throw new AppError("Teste", 400)
        const customers = await customersRepository.findAll()

        return res.json(customers)
    }

    async show(req, res, next) {
        try {
            const { id } = req.params

            const customer = await customersRepository.findById(id)
            if (!customer) {
                throw new AppError("Customer not found", 404)
            }
            return res.json(customer)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const { name, email } = req.body

            const customer = await customersRepository.findByEmail(email)
            if (customer) {
                throw new AppError("Email already exists", 409)
            }
            const newCustomer = await customersRepository.create(name, email)
            return res.status(201).json(newCustomer)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            const { name, email } = req.body

            const customer = await customersRepository.findById(id)
            if (!customer) {
                throw new AppError("Customer not found", 404)
            }

            const customerByEmail = await customersRepository.findByEmail(email)
            if (customerByEmail && customerByEmail.id !== Number(id)) {
                throw new AppError("Email already exists", 409)
            }

            const updatedCustomer = await customersRepository.update(id, name, email)
            return res.json(updatedCustomer)
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params

            const customer = await customersRepository.findById(id)
            if (!customer) {
                throw new AppError("Customer not found", 404)
            }
            const deletedCustomer = await customersRepository.delete(id)
            return res.json(deletedCustomer)
        } catch (error) {
            next(error)
        }
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