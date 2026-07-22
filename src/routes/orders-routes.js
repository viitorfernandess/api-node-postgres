import express from 'express'
import ordersController from '../controllers/orders-controller.js'
import { validateOrder } from '../middleware/orders-validation-middleware.js'

const router = express.Router()

router.get('/orders', ordersController.index)
router.get('/orders/:id', ordersController.show)
router.put('/customers/:customerId/orders', validateOrder, ordersController.create)
router.put('/orders/:id', validateOrder, ordersController.update)
router.delete('/orders/:id', ordersController.delete)

export default router