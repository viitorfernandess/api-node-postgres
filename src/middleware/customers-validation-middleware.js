export function validateCustomer(req, res, next) {
    const { name, email } = req.body

    if (name === undefined) {
        return res.status(400).json({ message: "Name is required" })
    }
    if (typeof name !== "string") {
        return res.status(400).json({ message: "Name must be a string" })
    }
    if (name.trim() === "") {
        return res.status(400).json({ message: "Name cannot be empty" })
    }

    if (email === undefined) {
        return res.status(400).json({ message: "Email is required" })
    }
    if (typeof email !== "string") {
        return res.status(400).json({ message: "Email must be a string" })
    }
    if (email.trim() === "") {
        return res.status(400).json({ message: "Email cannot be empty" })
    }


    const emailRegex = /\S+@\S+\.\S+/
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email" })
    }
    next()
}

