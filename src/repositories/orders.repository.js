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
}

export default new OrdersRepository()