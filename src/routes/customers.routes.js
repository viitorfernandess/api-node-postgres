import express from 'express'
import customersController from "../controllers/customers.controller.js"

const router = express.Router()

router.get('/customers', customersController.index)
router.get('/customers/:id', customersController.show)
router.post('/customers', customersController.create)
router.put('/customers/:id', customersController.update )


export default router