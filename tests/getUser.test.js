import getUser from "./getUser.js";

test("deve retornar usuário", async () => {
    const result = await getUser()

    expect(result).toEqual({
        name: "Vitor",
        age: 28
    })
}) 