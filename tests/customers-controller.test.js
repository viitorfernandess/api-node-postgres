import { expect, jest } from "@jest/globals"
import customersController from "../src/controllers/customers-controller"
import customersRepository from "../src/repositories/customers-repository"

afterEach(() => {
    jest.clearAllMocks()
})

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

test("deve criar um cliente", async () => {

    const spyFindByEmail = jest.spyOn(
        customersRepository,
        "findByEmail"
    )

    spyFindByEmail.mockResolvedValue(null)

    const spyCreate = jest.spyOn(
        customersRepository,
        "create"
    )

    spyCreate.mockResolvedValue({
        id: 10,
        name: "Vitor",
        email: "vitor@email.com"
    })

    const req = {
        body: {
            name: "Vitor",
            email: "vitor@email.com"
        }
    }

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    }

    const next = jest.fn()

    await customersController.create(req, res, next)

    expect(spyFindByEmail).toHaveBeenCalledWith("vitor@email.com")

    expect(spyCreate).toHaveBeenCalledWith(
        "Vitor",
        "vitor@email.com"
    )

    expect(res.status).toHaveBeenCalledWith(201)

    expect(res.json).toHaveBeenCalledWith({
        id: 10,
        name: "Vitor",
        email: "vitor@email.com"
    })

    expect(spyCreate).toHaveBeenCalledTimes(1)
})

test("deve retornar erro quando o email ja existir", async () => {
    const spyFindByEmail = jest.spyOn(
        customersRepository,
        "findByEmail"
    )

    const spyCreate = jest.spyOn(
        customersRepository,
        "create"
    )

    spyFindByEmail.mockResolvedValue({
        id: 5,
        name: "Outro cliente",
        email: "vitor@email.com"
    })

    const next = jest.fn()

    const req = {
        body: {
            name: "Vitor",
            email: "vitor@email.com"
        }
    }

    const res = {
        status: jest.fn(),
        json: jest.fn()
    }

    await customersController.create(req, res, next)

    expect(next).toHaveBeenCalled()

    expect(next).toHaveBeenCalledTimes(1)

    const error = next.mock.calls[0][0]

    expect(error.message).toBe("Email already exists")

    expect(error.statusCode).toBe(409)

    expect(spyCreate).not.toHaveBeenCalled()
})

test("deve atualizar um cliente", async () => {
    const spyFindById = jest.spyOn(
        customersRepository,
        "findById"
    )

    spyFindById.mockResolvedValue({
        id: 10,
        name: "Vitor",
        email: "vitor@email.com"
    })

    const spyFindByEmail = jest.spyOn(
        customersRepository,
        "findByEmail"
    )

    spyFindByEmail.mockResolvedValue(null)

    const spyUpdate = jest.spyOn(
        customersRepository,
        "update"
    )

    spyUpdate.mockResolvedValue({
        id: 10,
        name: "Vitor atualizado",
        email: "email@novo.com"
    })

    const req = {
        params: {
            id: 10
        },
        body: {
            name: "Vitor atualizado",
            email: "email@novo.com"
        }
    }

    const res = {
        json: jest.fn()
    }

    const next = jest.fn()

    await customersController.update(req, res, next)

    expect(spyFindById).toHaveBeenCalledWith(10)

    expect(spyFindByEmail).toHaveBeenCalledWith("email@novo.com")

    expect(spyUpdate).toHaveBeenCalledWith(
        10,
        "Vitor atualizado",
        "email@novo.com"
    )

    expect(res.json).toHaveBeenCalledWith({
        id: 10,
        name: "Vitor atualizado",
        email: "email@novo.com"
    })

    expect(spyUpdate).toHaveBeenCalledTimes(1)
})