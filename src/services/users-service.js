import bcrypt from "bcrypt"
import usersRepository from "../repositories/users-repository.js"
import AppError from "../errors/AppError.js"

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
}

export default new UsersService()