import AppError from "../errors/AppError.js"

function errorMiddleware(error, req, res, next) {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message })
    }

    console.error(error)

    return res.status(500).json({ message: "Internal server error" })
}

export default errorMiddleware