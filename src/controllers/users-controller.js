import usersService from "../services/users-service.js"

class UsersController {
    async create(req, res, next) {
        try {
            const { name, email, password } = req.body

            const user = await usersService.create(
                name,
                email,
                password
            )

            return res.status(201).json(user)
        } catch (error) {
            next(error)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body

            const token = await usersService.login(email, password)

            return res.status(200).json(token)
        } catch (error) {
            next(error)
        }
    }
}

export default new UsersController()