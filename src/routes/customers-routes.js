import express from 'express'
import customersController from "../controllers/customers-controller.js"
import { validateCustomer } from '../middleware/customers-validation-middleware.js'
import ensureAuth from '../middleware/ensure-auth.js'
import ensureRole from '../middleware/ensure-role.js'

const router = express.Router()

router.use('/customers', ensureAuth)


router.get('/customers', customersController.index)
router.get('/customers/:id', customersController.show)
router.post('/customers', validateCustomer, customersController.create)
router.put('/customers/:id', ensureRole("admin", "manager"), validateCustomer, customersController.update)
router.delete('/customers/:id', ensureRole("admin"), customersController.delete)
router.get('/customers/:id/orders', customersController.orders)


export default router