export function validateCreateCustomer(req, res, next) {
    const { name, email } = req.body
    if (!name) {
        return res.status(400).json({ message: "Name is required" })
    }
    if (!email) {
        return res.status(400).json({ message: "Email is required" })
    }
    if (typeof name !== "string") {
        return res.status(400).json({ message: "Name must be a string" })
    }
    if (typeof email !== "string") {
        return res.status(400).json({ message: "Email must be a string" })
    }

    const emailRegex = /\S+@\S+\.\S+/
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email" })
    }
    next()
}