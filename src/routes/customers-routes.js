import express from 'express'
import customersController from "../controllers/customers-controller.js"
import { validateCustomer } from '../middleware/customers-validation-middleware.js'

const router = express.Router()

router.get('/customers', customersController.index)
router.get('/customers/:id', customersController.show)
router.post('/customers', validateCustomer, customersController.create)
router.put('/customers/:id', validateCustomer,customersController.update)
router.delete('/customers/:id', customersController.delete)
router.get('/customers/:id/orders', customersController.orders)


export default router