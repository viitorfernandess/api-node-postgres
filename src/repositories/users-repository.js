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

    async findById(id) {
        const result = await pool.query(
            `SELECT id, role, token_version FROM users
            WHERE id = $1`,
            [id]
        )
        return result.rows[0]
    }

    async updatePassword(id, password) {
        const result = await pool.query(
            `
            UPDATE users
            SET
            password = $1,
            token_version = token_version + 1
            WHERE id = $2
            RETURNING id, token_version
            `,
            [password, id]
        )
        return result.rows[0]
    }
}

export default new UsersRepository()