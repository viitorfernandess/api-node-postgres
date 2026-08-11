import getUser from "./getUser.js"

test("deve retornar o usuário", () => {
    const result = getUser()

    expect(result).toEqual({
        name: "Vitor",
        age: 28
    })
}) 