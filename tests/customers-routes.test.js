import request from "supertest"
import { describe, it, expect, afterAll } from "@jest/globals"
import jwt from "jsonwebtoken"
import pool from "../database.js"

import app from "../app.js"

describe("GET /customers", () => {

    it("deve retornar 401 quando não houver token", async () => {
        const response = await request(app)
            .get("/customers")

        expect(response.statusCode).toBe(401)
    })

    it("deve retornar 200 com token válido", async () => {
        const token = jwt.sign(
            {
                id: 1,
                role: "manager"
            },
            process.env.JWT_SECRET
        )

        const response = await request(app)
            .get("/customers")
            .set("Authorization", `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
    })
})

afterAll(async () => {
    await pool.end()
})
