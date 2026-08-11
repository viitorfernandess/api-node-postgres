import divide from "./divide.js"
describe("divide", () => {
    test("deve dividir dois núemros", () => {
        expect(divide(10, 2)).toBe(5)
    })

    test("deve retornar erro ao dividir por zero", () => {
        expect(() => divide(10, 0)).toThrow("Não é possível dividir por zero")
    })
})