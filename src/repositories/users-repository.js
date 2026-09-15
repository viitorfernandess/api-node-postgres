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

    async create(name, email, password, role) {
        const result = await pool.query(
            `INSERT INTO users (
        name,
        email,
        password,
        role
        )
        
        VALUES ($1, $2, $3, $4)
        RETURNING * `,
            [name, email, password, role]
        )
        return result.rows[0]
    }
}

export default new UsersRepository()