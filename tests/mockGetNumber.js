import { jest } from "@jest/globals"

test("deve retornar 50", async () => {
    const mockGetNumber = jest.fn()

    mockGetNumber.mockResolvedValue(50)

    const result = await mockGetNumber()

    expect(result).toBe(50)
})