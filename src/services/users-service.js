import bcrypt from "bcrypt"
import usersRepository from "../repositories/users-repository.js"
import AppError from "../errors/AppError.js"
import jwt from "jsonwebtoken"

class UsersService {
    async create(name, email, password) {

        const user = await usersRepository.findByEmail(email)

        if (user) {
            throw new AppError("Email already exists", 409)
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        return usersRepository.create(
            name,
            email,
            hashedPassword
        )
    }

    async login(email, password) {
        const user = await usersRepository.findByEmail(email)

        if (!user) {
            throw new AppError("Invalid email or password", 401)
        }

        const senhaValida = await bcrypt.compare(password, user.password)
        if (!senhaValida) {
            throw new AppError("Invalid email or password", 401)
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        return token
    }
}

export default new UsersService()