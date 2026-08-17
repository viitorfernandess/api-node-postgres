import { jest } from "@jest/globals"

test("deve buscar o cliente", async () => {
    const mockFindById = jest.fn()

    mockFindById.mockResolvedValue({
        id: 10,
        name: "Vitor"
    })

    const result = await mockFindById(10)

    expect(result).toEqual({
        id: 10,
        name: "Vitor"
    })
})