import { jest } from "@jest/globals"

import ordersRepository from "../src/repositories/orders-repository"
import ordersController from "../src/controllers/orders-controller"
import customersRepository from "../src/repositories/customers-repository"

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