import pool from '../../database.js'

class CustomersRepository {
    async findAll() {
        const result = await pool.query(
            `SELECT * FROM customers`
        )

        return result.rows
    }

    async findById(id) {
        const result = await pool.query(
            `SELECT * FROM customers WHERE id = $1`,
            [id]
        )

        return result.rows[0]
    }
}

export default new CustomersRepository()