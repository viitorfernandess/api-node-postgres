import 'dotenv/config'
import { Pool } from 'pg'

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'api-node-postgres',
    user: 'postgres',
    password: process.env.DB_PASSWORD
})

export default pool