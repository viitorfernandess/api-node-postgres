import jwt from "jsonwebtoken"
import AppError from "../errors/AppError.js"
import usersRepository from "../repositories/users-repository.js"


async function ensureAuth(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return next(new AppError("Token not provided", 401))
    }

    const [prefix, token] = authHeader.split(" ")

    if (prefix !== "Bearer" || !token) {
        return next(new AppError("Invalid authorization format", 401))
    }

    let decoded

    try {
        decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )
    } catch (error) {
        return next(new AppError("Invalid or expired token", 401))
    }

    const user = await usersRepository.findById(decoded.id)
    if (!user) {
        throw new AppError("User not found", 401)
    }

    if (decoded.tokenVersion !== user.token_version) {
        throw new AppError("Invalid token", 401)
    }

    req.userId = user.id
    req.userRole = user.role

    next()
}

export default ensureAuth