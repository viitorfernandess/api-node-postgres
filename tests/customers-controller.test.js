import { jest } from "@jest/globals"
import customersController from "../src/controllers/customers-controller"
import customersRepository from "../src/repositories/customers-repository"

test("deve retornar o clinete pelo id", async () => {
    const spyFindById = jest.spyOn(
        customersRepository,
        "findById"
    )

    spyFindById.mockResolvedValue({
        age: 28,
        name: "Vitor"
    })

    const req = {
        params: {
            id: 10
        }
    }

    const res = {
        json: jest.fn()
    }

    await customersController.show(req, res)

    expect(res.json).toHaveBeenCalledWith({
        age: 28,
        name: "Vitor"
    })

    expect(spyFindById).toHaveBeenCalledWith(10)

    expect(spyFindById).toHaveBeenCalledTimes(1)
})

test("deve retornar erro quando o cliente não for encontrado", async () => {
    const spyFindById = jest.spyOn(
        customersRepository,
        "findById"
    )

    spyFindById.mockResolvedValue(null)

    const next = jest.fn()

    const req = {
        params: {
            id: 10
        }
    }

    const res = {
        json: jest.fn()
    }

    await customersController.show(req, res, next)

    expect(next).toHaveBeenCalled()

    expect(next).toHaveBeenCalledTimes(1)

    const error = next.mock.calls[0][0]

    expect(error.message).toBe("Customer not found")
})