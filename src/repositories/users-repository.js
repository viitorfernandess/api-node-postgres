import pool from "../../database.js"

class UsersRepository {
    async findByEmail(email) {
        const result = await pool.query(
            `SELECT * FROM users
            WHERE email = $1`,
            [email]
        )
        return result.rows[0]
    }
}

export default new UsersRepository()