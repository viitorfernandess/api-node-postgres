import sum from "./sum.js"

test("deve somar dois números", () => {
    const result = sum(2, 3)

    expect(result).toBe(5)
})