import request from "supertest"
import { test, expect, afterEach, afterAll } from "@jest/globals"
import pool from "../database.js"
import app from "../app.js"

let userId

afterEach(async () => {
    if (userId) {
        await pool.query(
            "DELETE FROM users WHERE id = $1",
            [userId]
        )
        userId = null
    }
})

afterAll(async () => {
    await pool.end()
})

test("deve fazer login com credenciais válidas", async () => {
    const userResponse = await request(app)
        .post("/users")
        .send({
            name: "Usuário teste",
            email: "teste-login2@email.com",
            password: "senhateste123",
            role: "admin"
        })

    expect(userResponse.statusCode).toBe(201)

    userId = userResponse.body.id

    const loginResponse = await request(app)
        .post("/login")
        .send({
            email: "teste-login2@email.com",
            password: "senhateste123"
        })

        console.log(loginResponse.body)

    expect(loginResponse.statusCode).toBe(200)
    expect(typeof loginResponse.body).toBe("string")
    expect(loginResponse.body.length).toBeGreaterThan(0)
})