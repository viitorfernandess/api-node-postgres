import { jest } from "@jest/globals"

test("deve retornar o usuário e ser chamada com o id correto", () => {
    const mockFindById = jest.fn()

    mockFindById.mockReturnValue({
        id: 10,
        name: "Vitor"
    })

    const result = mockFindById(10)

    expect(result).toEqual({
        id: 10,
        name: "Vitor"
    })

    expect(mockFindById).toHaveBeenCalledWith(10)
})