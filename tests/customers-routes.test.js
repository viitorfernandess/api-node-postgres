import request from "supertest"
import { describe, it, expect, afterAll, afterEach, test } from "@jest/globals"
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

    it("deve atualizar um customer com dados válidos", async () => {
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
                name: "Cliente para atualizar",
                email: "cliente-atualizar@email.com"
            })

        customerId = response.body.id

        const updateResponse = await request(app)
            .put(`/customers/${customerId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Cliente atualizado",
                email: "cliente-atualizado@email.com"
            })

        expect(updateResponse.statusCode).toBe(200)
        expect(updateResponse.body.name).toBe("Cliente atualizado")
        expect(updateResponse.body.email).toBe("cliente-atualizado@email.com")
    })

    test("deve retornar 403 quando seller tentar atualizar um customer", async () => {
        const token = jwt.sign(
            {
                id: 1,
                role: "seller"
            },
            process.env.JWT_SECRET
        )

        const response = await request(app)
            .post("/customers")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Cliente para teste de permissao",
                email: "cliente-permissao@email.com"
            })

        customerId = response.body.id

        const updateResponse = await request(app)
            .put(`/customers/${customerId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Cliente atualizado",
                email: "cliente-atualizado@email.com"
            })

        expect(updateResponse.statusCode).toBe(403)
    })

    test("deve retornar 403 quando seller tentar excluir um customer", async () => {
        const token = jwt.sign(
            {
                id: 1,
                role: "seller"
            },
            process.env.JWT_SECRET
        )

        const response = await request(app)
            .post("/customers")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Cliente novo",
                email: "cliente-novo@email.com"
            })

        customerId = response.body.id

        const deleteResponse = await request(app)
            .delete(`/customers/${customerId}`)
            .set("Authorization", `Bearer ${token}`)

        expect(deleteResponse.statusCode).toBe(403)
    })

    test("deve excluir um customer quando admin fizer a requisicao", async () => {
        const token = jwt.sign(
            {
                id: 1,
                role: "admin"
            },
            process.env.JWT_SECRET
        )

        const response = await request(app)
            .post('/customers')
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "cliente novo",
                email: "cliente-novo@email.com"
            })

        customerId = response.body.id

        const deleteResponse = await request(app)
            .delete(`/customers/${customerId}`)
            .set("Authorization", `Bearer ${token}`)

        expect(deleteResponse.statusCode).toBe(200)
    })

    test("deve retornar 403 quando manager tentar excluir um customer", async () => {
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
                name: "cliente novo",
                email: "cliente-novo@email.com"
            })

        customerId = response.body.id

        const responseDelete = await request(app)
            .delete(`/customers/${customerId}`)
            .set("Authorization", `Bearer ${token}`)

        expect(responseDelete.statusCode).toBe(403)
    })

    test("deve retornar o customer pelo id", async () => {
        const token = jwt.sign(
            {
                id: 1,
                role: "admin"
            },
            process.env.JWT_SECRET
        )

        const response = await request(app)
            .post("/customers")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Cliente novo",
                email: "cliente-novo@email.com"
            })

        customerId = response.body.id

        const responseCustomers = await request(app)
            .get(`/customers/${customerId}`)
            .set("Authorization", `Bearer ${token}`)


        expect(responseCustomers.body.name).toBe("Cliente novo")
        expect(responseCustomers.body.email).toBe("cliente-novo@email.com")
        expect(responseCustomers.statusCode).toBe(200)
    })

    test("deve retornar 404 quando o customer nao existir", async () => {
        const token = jwt.sign(
            {
                id: 1,
                role: "admin"
            },
            process.env.JWT_SECRET
        )

        const responseCustomers = await request(app)
            .get("/customers/123")
            .set("Authorization", `Bearer ${token}`)

        expect(responseCustomers.statusCode).toBe(404)
    })

    test("deve retornar customer da rota get", async () => {
        const token = jwt.sign(
            {
                id: 1,
                role: "admin"
            },
            process.env.JWT_SECRET
        )

        const response = await request(app)
            .get("/customers")
            .set("Authorization", `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)

    })
})

afterAll(async () => {
    await pool.end()
})
