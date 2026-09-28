import { describe, it, expect, jest, afterEach } from "@jest/globals"

import ensureRole from "../src/middleware/ensure-role.js"
import AppError from "../src/errors/AppError"

afterEach(() => {
    jest.clearAllMocks()
})
describe("ensureRole", () => {

    it("deve liberar o acesso quando a role do usuário for admin", () => {

        const req = {
            userRole: "admin"
        }

        const next = jest.fn()

        const middleware = ensureRole("admin", "manager")

        middleware(req, null, next)

        expect(next).toHaveBeenCalled()
    })

    it("deve liberar o acesso quando a role do usuário for manager", () => {

        const req = {
            userRole: "manager"
        }

        const next = jest.fn()

        const middleware = ensureRole("admin", "manager")

        middleware(req, null, next)

        expect(next).toHaveBeenCalled()
    })

    it("deve retornar erro ao tentar acessar com a role de seller", () => {

        const req = {
            userRole: "seller"
        }

        const next = jest.fn()

        const middleware = ensureRole("admin", "manager")

        try {
            middleware(req, null, next)
        } catch (error) {
            expect(error).toBeInstanceOf(AppError)
            expect(error.statusCode).toBe(403)
            expect(error.message).toBe("Access denied")
        }

        expect(next).not.toHaveBeenCalled()
    })
})