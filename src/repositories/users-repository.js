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

    async create(name, email, password) {
        const result = await pool.query(
            `INSERT INTO users (
        name,
        email,
        password
        )
        
        VALUES ($1, $2, $3)
        RETURNING * `,
            [name, email, password]
        )
        return result.rows[0]
    }
}

export default new UsersRepository()