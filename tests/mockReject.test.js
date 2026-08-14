import { jest } from "@jest/globals"

test("deve rejeitar a Promise", async () => {
    const mockFunction = jest.fn()

    mockFunction.mockRejectedValue(
        new Error("Algo deu errado")
    )

    await expect(mockFunction()).rejects.toThrow("Algo deu errado")
})