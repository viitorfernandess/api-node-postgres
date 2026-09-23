import { describe, it, expect, jest, afterEach } from "@jest/globals"

import ensureAuth from "../src/middleware/ensure-auth.js"
import AppError from "../src/errors/AppError.js"

afterEach(() => {
    jest.clearAllMocks()
})

describe("ensureAuth", () => {

    it("deve retornar erro 401 quando não houver token", () => {
        const req = {
            headers: {}
        }

        try {
            ensureAuth(req)
        } catch (error) {
            expect(error).toBeInstanceOf(AppError)
            expect(error.statusCode).toBe(401)
        }
    })

    it("deve retornar erro qunado o formato do token for inválido", () => {
        const req = {
            headers: {
                authorization: "Token abc123"
            }
        }

        try {
            ensureAuth(req)
        } catch (error) {
            expect(error).toBeInstanceOf(AppError)
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Invalid authorization format")
        }
    })
})