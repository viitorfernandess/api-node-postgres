import express from 'express'
import customersController from "../controllers/customers.controller.js"

const router = express.Router()

router.get('/customers', customersController.index)
router.get('/customers/:id', customersController.show)


export default router