import AppError from "../errors/AppError.js"

function ensureRole(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.userRole)) {
            throw new AppError("Access denied", 403)
        }
        next()
    }
}

export default ensureRole