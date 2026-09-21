import express from 'express'
import ordersController from '../controllers/orders-controller.js'
import { validateOrder } from '../middleware/orders-validation-middleware.js'
import ensureAuth from '../middleware/ensure-auth.js'
import ensureRole from '../middleware/ensure-role.js'

const router = express.Router()

router.use('/orders', ensureAuth)

router.get('/orders', ordersController.index)
router.get('/orders/:id', ordersController.show)
router.put('/customers/:customerId/orders', ensureAuth, validateOrder, ordersController.create)
router.put('/orders/:id', ensureRole("admin", "manager"), validateOrder, ordersController.update)
router.delete('/orders/:id', ensureRole("admin"), ordersController.delete)

export default router