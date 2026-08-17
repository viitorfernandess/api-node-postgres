import { jest } from "@jest/globals"

test("deve buscar usuário pelo id", async () => {
    const mockFindById = jest.fn()

    mockFindById.mockResolvedValue({
        age: 28,
        name: "Vitor"
    })

    const result = await mockFindById(10)

    expect(result).toEqual({
        age: 28,
        name: "Vitor"
    })

    expect(mockFindById).toHaveBeenCalledWith(10)

    expect(mockFindById).toHaveBeenCalledTimes(1)
})