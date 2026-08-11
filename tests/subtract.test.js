import subtract from "./subtract.js";

test("deve subtrair dois números", () => {
    const result = subtract(6, 4)
    
    expect(result).toBe(2)
})