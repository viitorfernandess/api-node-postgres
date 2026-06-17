import express from 'express'
import ordersController from '../controllers/orders-controller.js'

const router = express.Router()

router.get('/orders', ordersController.index)
router.get('/orders/:id', ordersController.show)
router.put('/orders', ordersController.create)
router.put('/orders/:id', ordersController.update)
export default router