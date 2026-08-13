import { jest } from "@jest/globals"

test("deve retornar 50", () => {
    const mockFunction = jest.fn()

    mockFunction.mockReturnValue(50)

    const result = mockFunction()

    expect(result).toBe(50)
})