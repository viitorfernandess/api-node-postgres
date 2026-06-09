import pool from '../../database.js'

class CustomersRepository {
    async findAll() {
        const result = await pool.query(
            `SELECT * FROM customers`
        )

        return result.rows
    }
}

export default new CustomersRepository()