import { jest } from "@jest/globals"

import ordersRepository from "../src/repositories/orders-repository"
import ordersController from "../src/controllers/orders-controller"
import customersRepository from "../src/repositories/customers-repository"

afterEach(() => {
    jest.clearAllMocks()
})

test("deve criar um pedido", async () => {
    const spyFindById = jest.spyOn(
        customersRepository,
        "findById"
    )

    spyFindById.mockResolvedValue({
        id: 10,
        name: "Vitor",
        email: "vitor@email.com"
    })

    const spyCreate = jest.spyOn(
        ordersRepository,
        "create"
    )

    spyCreate.mockResolvedValue({
        id: 1,
        customer_id: 10,
        description: "pedido teste",
        amount: 100
    })

    const req = {
        params: {
            customerId: 10
        },
        body: {
            description: "pedido teste",
            amount: 100
        }
    }

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    }

    const next = jest.fn()

    await ordersController.create(req, res, next)

    expect(spyFindById).toHaveBeenCalledWith(10)

    expect(spyCreate).toHaveBeenCalledWith(
        10,
        "pedido teste",
        100
    )

    expect(res.status).toHaveBeenCalledWith(201)

    expect(res.json).toHaveBeenCalledWith({
        id: 1,
        customer_id: 10,
        description: "pedido teste",
        amount: 100
    })
})

test("deve retornar erro quando o cliente não existir", async () => {
    const spyFindById = jest.spyOn(
        customersRepository,
        "findById"
    )

    spyFindById.mockResolvedValue(null)

    const next = jest.fn()

    const req = {
        params: {
            customerId: 10
        },
        body: {
            description: "pedido teste",
            amount: 100
        }
    }

    const res = {
        json: jest.fn()
    }

    const spyCreate = jest.spyOn(
        ordersRepository,
        "create"
    ) 

    await ordersController.create(req, res, next)

    expect(next).toHaveBeenCalled()

    const error = next.mock.calls[0][0]

    expect(error.message).toBe("Customer not found")

    expect(error.statusCode).toBe(404)

    expect(spyCreate).not.toHaveBeenCalled()
})