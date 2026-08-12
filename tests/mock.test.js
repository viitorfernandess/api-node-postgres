TextDecoderStream("deve testar função mock", () => {
    const mockFunction = jest.fn()

    mockFunction.mockReturnValue(42)

    const result = mockFunction()

    expect(result).toBe(42)
    expect(mockFunction).tohaveBeenCalled()
})