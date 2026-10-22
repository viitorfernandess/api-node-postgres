import rateLimit from "express-rate-limit"

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    message: {
        message: "Muitas tentativas de login. Tente novamente mais tarde."
    },
    standardHeaders: true,
    legacyHeaders: false
})

export default loginLimiter