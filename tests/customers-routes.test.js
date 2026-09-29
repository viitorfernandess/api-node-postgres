import request from "supertest"
import { describe, it, expect } from "@jest/globals"

import app from "../app.js"

describe("GET /customers", () => {

    it("deve retornar 401 quando não houver token", async () => {
        const response = await request(app)
            .get("/customers")

        expect(response.statusCode).toBe(401)
    })
})
