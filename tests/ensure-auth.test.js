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

    it("deve retornar erro quando o formato do token for inválido", () => {
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

    it("deve retornar erro quando o token for inválido ou expirar", () => {
        const req = {
            headers: {
                authorization: "Bearer abc123"
            }
        }

        const next = jest.fn()

        ensureAuth(req, null, next)

        const error = next.mock.calls[0][0]

        expect(error).toBeInstanceOf(AppError)
        expect(error.statusCode).toBe(401)
        expect(error.message).toBe("Token inválido ou expirado")
    })
})