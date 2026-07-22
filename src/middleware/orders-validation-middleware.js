export function validateOrder(req, res, next) {
    const { description, amount } = req.body

    if (description === undefined) {
        return res.status(400).json({ message: "Description is required" })
    }
    if (amount === undefined) {
        return res.status(400).json({ message: "Amount is required" })
    }

    if (typeof description !== "string") {
        return res.status(400).json({ message: "Description must be a string" })
    }
    if (typeof amount !== "number") {
        return res.status(400).json({ message: "Amount must be a number" })
    }

    if (description.trim() === "") {
        return res.status(400).json({ message: "Description cannot be empty" })
    }
    next()
}