import jwt from "jsonwebtoken"
import AppError from "../errors/AppError.js"


function ensureAuth(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        throw new AppError("Token not provided", 401)
    }

    const [prefix, token] = authHeader.split(" ")

    if (prefix !== "Bearer" || !token) {
        throw new AppError("Invalid authorization format", 401)
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )
        req.userId = decoded.id
        req.userRole = decoded.role

        next()
    } catch (error) {
        next(new AppError("Token inválido ou expirado", 401))
    }
}

export default ensureAuth