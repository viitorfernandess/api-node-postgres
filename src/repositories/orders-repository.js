import pool from '../../database.js'

class OrdersRepository {
    async findAll() {
        const result = await pool.query(
            `SELECT * FROM orders`
        )

        return result.rows
    }

    async findById(id) {
        const result = await pool.query(
            `SELECT * FROM orders
            WHERE id = $1`,
            [id]
        )

        return result.rows[0]
    }

    async create(customerId, description, amount) {
        const result = await pool.query(
            `
            INSERT INTO orders (
            customer_id,
            description, 
            amount
            )
            VALUES ($1, $2, $3)
            RETURNING *
            `,
            [customerId, description, amount]
        )

        return result.rows[0]
    }

    async update(id, description, amount) {
        const result = await pool.query(
            `
            UPDATE orders
            SET
            description = $1,
            amount = $2
            WHERE id = $3
            RETURNING *
            `,
            [description, amount, id]
        )
        return result.rows[0]
    }

    async delete(id) {
        const result = await pool.query(
            `
            DELETE FROM orders
            WHERE id = $1
            RETURNING *
            `,
            [id]
        )
        return result.rows[0]
    }

}

export default new OrdersRepository()