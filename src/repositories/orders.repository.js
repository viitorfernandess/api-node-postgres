import pool from '../../database.js'

class OrdersRepository {
    async findAll() {
        const result = await pool.query(
            `SELECT * FROM orders`
        )

        return result.rows
    }
}

export default new OrdersRepository()