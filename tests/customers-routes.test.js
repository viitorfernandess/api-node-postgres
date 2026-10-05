import request from "supertest"
import { describe, it, expect, afterAll, afterEach } from "@jest/globals"
import jwt from "jsonwebtoken"
import pool from "../database.js"

import app from "../app.js"

let customerId

afterEach(async () => {
    if (customerId) {
        await pool.query(
            "DELETE FROM customers WHERE id = $1",
            [customerId]
        )

        customerId = null
    }
})

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

    it("deve retornar 401 com token inválido", async () => {
        const response = await request(app)
            .get("/customers")
            .set("Authorization", "Bearer token-falso")

        expect(response.statusCode).toBe(401)
    })

    it("deve criar um customer com dados válidos", async () => {
        const token = jwt.sign(
            {
                id: 1,
                role: "manager"
            },
            process.env.JWT_SECRET
        )

        const response = await request(app)
            .post("/customers")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Integracao",
                email: "teste-integracao-04@email.com"
            })

        customerId = response.body.id

        expect(response.statusCode).toBe(201)
    })

    it("deve retornar 409 quando o email já existir", async () => {
        const token = jwt.sign(
            {
                id: 1,
                role: "manager"
            },
            process.env.JWT_SECRET
        )

        const response = await request(app)
            .post("/ customers")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Cliente teste",
                email: "email-duplicado@email.com"
            })

        customerId = response.body.id

        const responseDuplicate = await request(app)
            .post("/customers")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Outro cliente",
                email: "email-duplicado@email.com"
            })

        expect(responseDuplicate.statusCode).toBe(409)
        expect(responseDuplicate.body.message).toBe("Email already exists")
    })

    it("deve retornar 400 quando dos dados forem inválidos", async () => {
        const token = jwt.sign({
            id: 1,
            role: "manager"
        },
            process.env.JWT_SECRET)

        const response = await request(app)
            .post("/customers")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "",
                email: "email-invalido"
            })

        expect(response.statusCode).toBe(400)
        expect(response.body.message).toBe("Name cannot be empty")
    })
})

afterAll(async () => {
    await pool.end()
})
