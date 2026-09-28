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
})